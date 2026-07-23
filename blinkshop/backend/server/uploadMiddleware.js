// const multer = require('multer');
// const cloudinary = require('./cloudinary');
// const { Readable } = require('stream');

// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// // 👇 This will now support multiple files
// const uploadToCloudinary = async (req, res, next) => {
//   try {
//     if (!req.files || req.files.length === 0) return next();

//     let urls = [];

//     // Loop through each file and upload
//     for (const file of req.files) {
//       const stream = await new Promise((resolve, reject) => {
//         const uploadStream = cloudinary.uploader.upload_stream(
//           { resource_type: 'image' },
//           (error, result) => {
//             if (error) reject(error);
//             else resolve(result);
//           }
//         );

//         const bufferStream = new Readable();
//         bufferStream.push(file.buffer);
//         bufferStream.push(null);
//         bufferStream.pipe(uploadStream);
//       });

//       urls.push(stream.secure_url);
//     }

//     req.imageUrls = urls; // ✅ Attach to req object
//     next();
//   } catch (err) {
//     console.error("Upload error:", err);
//     return res.status(500).json({ error: "Image upload failed" });
//   }
// };

// module.exports = { upload, uploadToCloudinary };


const { upload, uploadFile } = require("../service/imageService");

const uploadImages = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return next();
    }

    const urls = [];

    for (const file of req.files) {
      const url = await uploadFile(file.buffer, file.originalname,file.mimetype);
      urls.push(url);
    }

    req.imageUrls = urls;

    next();
  } catch (err) {
    console.error("Upload error:", err);
    return res.status(500).json({
      error: "Image upload failed",
    });
  }
};

module.exports = {
  upload,
  uploadToCloudinary: uploadImages,
};