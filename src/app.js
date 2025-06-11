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
    origin: "https://link-dev-frontend.vercel.app/",
    credentials: true,
  })
);

server.get("/health", (req, res) => res.send("OK"));

server.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

server.use(express.json());
server.use(cookieParser());

server.use("/", authRouter);
server.use("/", dashRouter);

module.exports = server;
