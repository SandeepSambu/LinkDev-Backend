const express = require("express");
const server = express();
const cors = require("cors");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const dashRouter = require("./routes/dashboard");
require("dotenv").config();
const path = require("path");

server.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

server.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

server.use(express.json());
server.use(cookieParser());

server.use("/", authRouter);
server.use("/", dashRouter);

connectDB()
  .then(() => {
    console.log("Connected to database successfully...");
  })
  .catch((err) => {
    console.log("Database connection is not established..." + err.message);
  });

module.exports = server;
