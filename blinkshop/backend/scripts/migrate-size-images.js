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


async function loadJSON(file) {

  if (await fs.pathExists(file)) {
    return await fs.readJson(file);
  }

  return {};

}


async function saveJSON(file, data) {

  await fs.writeJson(file, data, {
    spaces: 2,
  });

}



async function uploadImage(url) {


  const mapping = await loadJSON(MAPPING_FILE);


  // already migrated
  if (mapping[url]) {

    console.log("⏭️ Already exists");

    return mapping[url];

  }



  const fileName = url.split("/").pop().split("?")[0];



  const result = await client.files.upload({

    file: url,

    fileName,

    folder: "/products/sizes",

    useUniqueFileName: false,

  });



  mapping[url] = result.url;


  await saveJSON(
    MAPPING_FILE,
    mapping
  );


  console.log("✅ Migrated:");
  console.log(result.url);



  return result.url;

}




async function run(){


  await connectDB();



  // सिर्फ एक product test
  const product = await productsmodel.findOne();



  if(!product){

    console.log("No product found");

    process.exit();

  }



  console.log(
    "Product:",
    product._id
  );




  for(let detail of product.productdetails){



    if(!detail.colors || detail.colors.length === 0)
      continue;



    for(let color of detail.colors){



      if(!color.sizes || color.sizes.length === 0)
        continue;




      for(let size of color.sizes){



        if(!size.image || size.image.length === 0)
          continue;




        const newImages = [];



        for(let img of size.image){



          // already imagekit
          if(!img.includes("cloudinary.com")){

            newImages.push(img);

            continue;

          }




          try{


            const newUrl = await uploadImage(img);


            newImages.push(newUrl);



          }
          catch(error){



            console.log(
              "❌ Failed:",
              img
            );



            const failed = await loadJSON(
              FAILED_FILE
            );


            failed[img] = error.message;



            await saveJSON(
              FAILED_FILE,
              failed
            );



            // keep old url
            newImages.push(img);


          }



        }



        size.image = newImages;


      }


    }


  }




  await product.save();



  console.log(
    "🎉 Size images updated"
  );


}



run();