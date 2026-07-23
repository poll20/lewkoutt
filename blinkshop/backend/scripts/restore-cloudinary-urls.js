require("dotenv").config();

const fs = require("fs-extra");
const path = require("path");

const connectDB = require("../database/dbconn");
const { productsmodel } = require("../database/collection");

const MAPPING_FILE = path.join(__dirname, "mapping.json");

async function loadMapping() {
  if (!(await fs.pathExists(MAPPING_FILE))) {
    throw new Error("mapping.json not found");
  }

  const mapping = await fs.readJson(MAPPING_FILE);

  // Reverse Mapping
  const reverse = {};

  for (const [cloudinaryUrl, imagekitUrl] of Object.entries(mapping)) {
    reverse[imagekitUrl] = cloudinaryUrl;
  }

  return reverse;
}

// async function restoreImage(url, reverseMapping) {
//   if (!url) return url;

//   // Already Cloudinary
//   if (url.includes("cloudinary.com")) {
//     return url;
//   }

//   // Already R2
//   if (url.includes(".r2.dev")) {
//     return url;
//   }

//   const cloudinaryUrl = reverseMapping[url];

//   if (!cloudinaryUrl) {
//     console.log("⚠ Mapping not found:");
//     console.log(url);
//     return url;
//   }

//   console.log("✅ Restored");
//   console.log(imagekitToShort(url));
//   console.log("⬇");
//   console.log(cloudinaryToShort(cloudinaryUrl));

//   return cloudinaryUrl;
// }
async function restoreImage(url, reverseMapping) {

  if (!url) return url;

  // Already Cloudinary
  if (url.includes("cloudinary.com")) {
    return url;
  }

  // Already R2
  if (url.includes(".r2.dev")) {
    return url;
  }

  // Sirf ImageKit URLs handle karo
  if (!url.includes("imagekit.io")) {
    return url;
  }

  // 1. Exact match
  let cloudinaryUrl = reverseMapping[url];

  // 2. Agar exact match nahi mila to filename se search karo
  if (!cloudinaryUrl) {

    const filename = url.split("/").pop();

    for (const [ikUrl, cldUrl] of Object.entries(reverseMapping)) {

      if (ikUrl.endsWith(filename)) {
        cloudinaryUrl = cldUrl;
        break;
      }

    }

  }

  if (!cloudinaryUrl) {

    console.log("❌ Mapping not found:");
    console.log(url);

    return url;

  }

  console.log("✅ Restored");
  console.log(imagekitToShort(url));
  console.log("⬇");
  console.log(cloudinaryToShort(cloudinaryUrl));

  return cloudinaryUrl;

}

function imagekitToShort(url) {
  return url.split("/").pop();
}

function cloudinaryToShort(url) {
  return url.split("/").pop();
}

async function run() {

  await connectDB();

  const reverseMapping = await loadMapping();

  const products = await productsmodel.find({});

  console.log(`Total Products: ${products.length}`);

  let count = 0;

  for (const product of products) {

    console.log("\n========================");
    console.log(`Processing ${count + 1}/${products.length}`);
    console.log(product._id);

    // Main image

    if (product.image) {
      product.image = await restoreImage(
        product.image,
        reverseMapping
      );
    }

    // Product Details

    for (const detail of product.productdetails || []) {

      if (detail.image?.length) {

        const images = [];

        for (const img of detail.image) {

          images.push(
            await restoreImage(
              img,
              reverseMapping
            )
          );

        }

        detail.image = images;

      }

      // Colors

      for (const color of detail.colors || []) {

        for (const size of color.sizes || []) {

          if (size.image?.length) {

            const images = [];

            for (const img of size.image) {

              images.push(
                await restoreImage(
                  img,
                  reverseMapping
                )
              );

            }

            size.image = images;

          }

        }

      }

    }

    await product.save();

    count++;

    console.log(`✅ Saved ${count}/${products.length}`);

  }

  console.log("\n🎉 ALL DONE");

}

run()
.catch(err => {
  console.error(err);
  process.exit(1);
});