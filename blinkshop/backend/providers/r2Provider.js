const { v4: uuid } = require("uuid");
const path = require("path");
const {
  S3Client,
  PutObjectCommand,
} = require("@aws-sdk/client-s3");

const client = new S3Client({
  region: "auto",

  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,

  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || "dummy",
    secretAccessKey:
      process.env.R2_SECRET_ACCESS_KEY || "dummy",
  },
});

async function uploadFile(fileBuffer, fileName, mimeType) {
  const extension =path.extname(fileName) || ".jpg";
  const now = new Date();

const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, "0");
const key = `products/${year}/${month}/${uuid()}${extension}`;
    
  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME || "dummy",
    Key:key,
    Body: fileBuffer,
    ContentType: mimeType,
    ContentDisposition: "inline",
  });

  await client.send(command);

  return `${process.env.R2_PUBLIC_URL}/${key}`;
}

module.exports = {
  uploadFile,
};