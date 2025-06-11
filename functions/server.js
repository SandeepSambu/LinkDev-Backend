const serverless = require("serverless-http");
const server = require("../src/app");
const connectDB = require("../src/config/database");

let isConnected = false;

const handler = async (event, context) => {
  try {
    if (!isConnected) {
      await connectDB();
      isConnected = true;
      console.log("✅ MongoDB connected.");
    }
  } catch (err) {
    console.error("❌ DB Connection failed:", err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Database connection failed." }),
    };
  }

  return serverless(server)(event, context);
};

module.exports.handler = handler;
