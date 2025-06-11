const serverless = require("serverless-http");
const server = require("../src/app");
const connectDB = require("../src/config/database");

let isConnected = false;
const handler = serverless(server);

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  if (!isConnected) {
    try {
      await connectDB();
      isConnected = true;
    } catch (err) {
      console.error("❌ DB connection failed:", err.message);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "Database connection failed" }),
      };
    }
  }

  return handler(event, context);
};
