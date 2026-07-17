require("dotenv").config();

const ImageKit = require("@imagekit/nodejs").default;

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

const cloudinaryUrl =
  "https://res.cloudinary.com/ddbz9m39a/image/upload/v1757066848/ewgjadbqz9rkh1tuxutx.webp";

async function run() {
  try {
    const result = await client.files.upload({
      file: cloudinaryUrl,
      fileName: `test-${Date.now()}.webp`,
      folder: "/migration-test",
      useUniqueFileName: true,
    });

    console.log("✅ Uploaded Successfully");
    console.log(result.url);
  } catch (err) {
    console.error("❌ Upload Error");
    console.error(err);
  }
}

run();