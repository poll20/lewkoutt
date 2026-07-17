require("dotenv").config();

const fs = require("fs-extra");
const path = require("path");
const ImageKit = require("@imagekit/nodejs").default;

const connectDB = require("../database/dbconn");
const { productsmodel } = require("../database/collection");


const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});


const MAPPING_FILE = path.join(__dirname, "mapping.json");
const FAILED_FILE = path.join(__dirname, "failed.json");



async function loadJSON(file){

  if(await fs.pathExists(file)){
    return await fs.readJson(file);
  }

  return {};

}



async function saveJSON(file,data){

  await fs.writeJson(file,data,{
    spaces:2
  });

}




async function uploadImage(url){


  const mapping = await loadJSON(MAPPING_FILE);


  if(mapping[url]){

    console.log("⏭️ Already migrated");

    return mapping[url];

  }



  const fileName = url.split("/").pop().split("?")[0];



  const result = await client.files.upload({

    file:url,

    fileName,

    folder:"/products",

    useUniqueFileName:false,

  });



  mapping[url] = result.url;


  await saveJSON(
    MAPPING_FILE,
    mapping
  );



  console.log("✅ Uploaded:");
  console.log(result.url);



  return result.url;

}





async function migrateSingleImage(url){


  if(!url)
    return url;



  if(!url.includes("cloudinary.com")){

    return url;

  }



  try{

    return await uploadImage(url);

  }
  catch(error){


    console.log(
      "❌ Failed:",
      url
    );


    const failed = await loadJSON(
      FAILED_FILE
    );


    failed[url] = error.message;


    await saveJSON(
      FAILED_FILE,
      failed
    );


    return url;

  }

}





async function run(){


  await connectDB();



  const products = await productsmodel.find({});


  console.log(
    `Total Products: ${products.length}`
  );



  let count = 0;



  for(const product of products){



    console.log("\n-------------------");

    console.log(
      `Processing ${count+1}/${products.length}`,
      product._id
    );



    // 1. Main product image

    if(product.image){

      product.image = await migrateSingleImage(
        product.image
      );

    }




    // 2. Product details images

    for(const detail of product.productdetails || []){


      if(detail.image?.length){


        const newImages = [];


        for(const img of detail.image){

          newImages.push(
            await migrateSingleImage(img)
          );

        }


        detail.image = newImages;


      }




      // 3. Size images

      for(const color of detail.colors || []){


        for(const size of color.sizes || []){


          if(size.image?.length){


            const newSizeImages=[];



            for(const img of size.image){


              newSizeImages.push(
                await migrateSingleImage(img)
              );


            }


            size.image = newSizeImages;


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



  console.log("\n🎉 ALL PRODUCTS MIGRATION DONE");


}



run()
.catch(err=>{

 console.log(err);

 process.exit(1);

});