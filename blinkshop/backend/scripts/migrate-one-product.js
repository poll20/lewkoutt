require("dotenv").config();

const ImageKit = require("@imagekit/nodejs").default;
const connectDB = require("../database/dbconn");
const { productsmodel } = require("../database/collection");

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function uploadUrl(url) {
  const fileName = url.split("/").pop().split("?")[0];

  const result = await client.files.upload({
    file: url,
    fileName,
    folder: "/products",
    useUniqueFileName: false,
  });

  return result.url;
}

async function run() {
  await connectDB();

  // First product
  const product = await productsmodel.findOne();

  if (!product) {
    console.log("❌ No product found");
    process.exit();
  }

  console.log("Product:", product._id);

  console.log("Old URL:");
  console.log(product.image);

  const newUrl = await uploadUrl(product.image);

  console.log("\nNew URL:");
  console.log(newUrl);

  product.image = newUrl;

  await product.save();

  console.log("\n✅ MongoDB Updated Successfully");
}

run().catch(console.error);