const multer = require("multer");
const path = require("path");

const whitelist = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

const FILE_DIR = path.join(__dirname, "..", "tmp");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, FILE_DIR);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 1 * 1000 * 1000 },
  fileFilter: (req, file, cb) => {
    console.log("file:", file);
    if (!whitelist.includes(file.mimetype)) {
      return cb(new Error("file is not allowed"));
    }
    console.log("file in storage 25:".yellow.bold.itali, file);

    cb(null, true);
  },
});

module.exports = upload;
