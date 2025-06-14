const express = require("express");
const server = express();
const cors = require("cors");
const connectDB = require("./src/config/database");
const cookieParser = require("cookie-parser");
const authRouter = require("./src/routes/auth");
const dashRouter = require("./src/routes/dashboard");
require("dotenv").config();
const path = require("path");
const port = process.env.PORT || 5000;

server.use(
  cors({
    origin: ["https://link-dev-frontend.vercel.app/", "http://localhost:5173/"],
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
    server.listen(port, () => {
      console.log(`Listening on port ${port}...`);
    });
  })
  .catch((err) => {
    console.log("Failed to connected to database");
  });

module.exports = server;
