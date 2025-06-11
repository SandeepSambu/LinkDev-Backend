const express = require("express");
const server = express();
const cors = require("cors");
const connectDB = require("./src/config/database");
const cookieParser = require("cookie-parser");
const authRouter = require("./src/routes/auth");
const dashRouter = require("./src/routes/dashboard");
require("dotenv").config();
const path = require("path");

server.use(
  cors({
    origin: "https://link-dev-frontend.vercel.app/",
    credentials: true,
  })
);

server.get("/health", (req, res) => res.send("OK"));

server.use("/uploads", express.static(path.join(__dirname, "uploads")));

server.use(express.json());
server.use(cookieParser());

server.use("/", authRouter);
server.use("/", dashRouter);

connectDB()
  .then(() => {
    console.log("Connected to Database successfully");
    server.listen(5000, () => {
      console.log("Listening on port 5000...");
    });
  })
  .catch((err) => {
    console.log("Failed to connected to database");
  });

module.exports = server;
