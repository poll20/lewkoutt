const ImageKit = require("@imagekit/nodejs").default;

const client = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function uploadFile(fileBuffer, fileName) {
  const result = await client.files.upload({
    file: fileBuffer,
    fileName,
    folder: "/products",
    useUniqueFileName: true,
  });

  return result.url;
}

module.exports = {
  uploadFile,
};