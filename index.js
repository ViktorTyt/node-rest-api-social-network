const express = require("express");
const app = express();
const cors = require("cors");
require("colors");

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const logger = require("morgan");

const userRoute = require("./routers/users");
const authRoute = require("./routers/auth");
const postRoute = require("./routers/posts");

app.use(express.json());

dotenv.config();

mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGO_URL, () => {
  console.log("Mongo DB connected".cyan.bold.italic);
});

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
// middlewares
app.use(cors());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.listen(8800, () => {
  console.log("Backend server is running!".cyan.bold.italic);
});
