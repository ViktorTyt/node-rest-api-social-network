const express = require("express");
const app = express();
const cors = require("cors");
require("colors");

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const logger = require("morgan");
const multer = require("multer");
const path = require("path");

const userRoute = require("./routers/users");
const authRoute = require("./routers/auth");
const postRoute = require("./routers/posts");

dotenv.config();

mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGO_URL, () => {
  console.log("Mongo DB connected".cyan.bold.italic);
});

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use(express.json());
app.use(logger(formatsLogger));

// middlewares
app.use(cors());
app.use(
  helmet({ crossOriginResourcePolicy: false, crossOriginEmbedderPolicy: false })
);
app.use(morgan("common"));

// multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    console.log(req);
    cb(null, req.body.name);
  },
});

const upload = multer({ storage });
app.use("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploaded successfully!");
  } catch (error) {
    console.log(error);
  }
});

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.listen(8800, () => {
  console.log("Backend server is running!".cyan.bold.italic);
});
