const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const authRouter = require("./routes/api/auth");
// const usersRouter = require("./routes/api/users");
const postsRouter = require("./routes/api/posts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth", authRouter);
// app.use("/api/users", usersRouter);
app.use("/api/posts", postsRouter);

app.use((req, res) => {
  console.log(req);
  console.log("in app 24-th line".red.bold.italic);
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  console.log("in app 30-th line".red.bold.italic);

  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
