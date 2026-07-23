const multer = require("multer");
const provider = require("../providers");

const storage = multer.memoryStorage();

const upload = multer({ storage });

module.exports = {
  upload,
  uploadFile: provider.uploadFile,
};