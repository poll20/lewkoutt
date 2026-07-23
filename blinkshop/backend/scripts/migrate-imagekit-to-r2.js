require("dotenv").config();

const fs = require("fs-extra");
const path = require("path");
const axios = require("axios");
const { v4: uuid } = require("uuid");

const {
  S3Client,
  PutObjectCommand
} = require("@aws-sdk/client-s3");


const connectDB = require("../database/dbconn");
const { productsmodel } = require("../database/collection");



// ================= R2 CLIENT =================


const r2 = new S3Client({

  region: "auto",

  endpoint:
    `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,

  credentials: {

    accessKeyId:
      process.env.R2_ACCESS_KEY_ID,

    secretAccessKey:
      process.env.R2_SECRET_ACCESS_KEY

  }

});




// ================= FILES =================


// const MAPPING_FILE =
// path.join(__dirname,"mapping.json");
const MAPPING_FILE =
path.join(__dirname,"mapping-r2.json");


// const FAILED_FILE =
// path.join(__dirname,"failed.json");

const FAILED_FILE =
path.join(__dirname,"failed-r2.json");





async function loadJSON(file){

  if(await fs.pathExists(file)){

    return await fs.readJson(file);

  }


  return {};

}




async function saveJSON(file,data){

  await fs.writeJson(
    file,
    data,
    {
      spaces:2
    }
  );

}





// ================= UPLOAD TO R2 =================
function sleep(ms){
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function uploadImage(url){
await sleep(1500); // 1 second delay

  const mapping =
    await loadJSON(MAPPING_FILE);



  // already migrated

  if(mapping[url]){

    console.log("⏭ Already migrated");

    return mapping[url];

  }



  console.log("⬇ Downloading:");

  console.log(url);



//   const response =
//     await axios.get(
//       url,
//       {
//         responseType:"arraybuffer"
//       }
//     );
let response;

for(let attempt = 1; attempt <= 5; attempt++){

  try{

    response = await axios.get(
      url,
      {
        responseType:"arraybuffer",
        timeout: 30000
      }
    );

    break;

  }
  catch(err){

    if(err.response?.status === 429){

      console.log(
        `⚠️ Rate limited. Waiting ${attempt * 5}s...`
      );

      await sleep(attempt * 5000);

    }
    else{

      throw err;

    }

  }

}


if(!response){

 throw new Error("Download failed after retries");

}




  const contentType =
    response.headers["content-type"];



  let extension =
    "webp";


  if(contentType){

    if(contentType.includes("jpeg"))
      extension="jpg";

    else if(contentType.includes("png"))
      extension="png";

    else if(contentType.includes("webp"))
      extension="webp";

  }





  const date =
    new Date();



  const year =
    date.getFullYear();


  const month =
    String(date.getMonth()+1)
    .padStart(2,"0");





  const key =

  `products/${year}/${month}/${uuid()}.${extension}`;





  await r2.send(

    new PutObjectCommand({

      Bucket:
      process.env.R2_BUCKET_NAME,


      Key:key,


      Body:
      response.data,


      ContentType:
      contentType

    })

  );





  const finalUrl =

  `${process.env.R2_PUBLIC_URL}/${key}`;





  mapping[url]=finalUrl;



  await saveJSON(
    MAPPING_FILE,
    mapping
  );




  console.log("✅ R2 Uploaded:");

  console.log(finalUrl);



  return finalUrl;


}








// ================= SINGLE IMAGE =================


async function migrateSingleImage(url){


  if(!url)
    return url;

// Cloudinary aur ImageKit dono migrate honge.
// R2 already migrated ho to skip.

// ✅ R2 already
if (url.includes(process.env.R2_PUBLIC_URL)) {
  return url;
}

// ❌ Skip ImageKit completely
if (url.includes("imagekit.io")) {
  console.log("⏭️ Skipped ImageKit:", url);
  return url;
}

// ✅ Only Cloudinary migrate
if (!url.includes("cloudinary.com")) {
  return url;
}

// if (url.includes(".r2.dev")) {
//   return url;
// }




  try{


    return await uploadImage(url);


  }

  catch(error){



    console.log(
      "❌ Failed:",
      url
    );


    console.log(
      error.message
    );



    const failed =
      await loadJSON(
        FAILED_FILE
      );



    failed[url]=
      error.message;



    await saveJSON(
      FAILED_FILE,
      failed
    );



    return url;


  }


}









// ================= MIGRATION =================



async function run(){



  await connectDB();



  const products =
  await productsmodel.find({});



  console.log(
    `Total Products: ${products.length}`
  );



  let count=0;





  for(const product of products){



    console.log("\n====================");

    console.log(
      `Processing ${count+1}/${products.length}`
    );

    console.log(
      product._id
    );





    // MAIN IMAGE

    if(product.image){


      product.image =
      await migrateSingleImage(
        product.image
      );


    }







    // DETAILS IMAGES


    for(const detail of product.productdetails || []){


      if(detail.image?.length){


        const images=[];


        for(const img of detail.image){


          images.push(

            await migrateSingleImage(img)

          );


        }



        detail.image =
        images;



      }







      // COLORS SIZE IMAGES


      for(const color of detail.colors || []){


        for(const size of color.sizes || []){



          if(size.image?.length){



            const sizeImages=[];



            for(const img of size.image){



              sizeImages.push(

                await migrateSingleImage(img)

              );


            }



            size.image =
            sizeImages;



          }


        }


      }



    }






    await product.save();



    count++;



    console.log(
      `✅ Completed ${count}/${products.length}`
    );



  }





  console.log(
"\n🎉 ALL IMAGES MIGRATED TO R2"
);



}






run()

.catch(err=>{


 console.log(err);


 process.exit(1);


});