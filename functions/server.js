const serverless = require("serverless-http");
const server = require("../src/app");
const connectDB = require("../src/config/database");

let isConnected = false;

module.exports.handler = async (event, context) => {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }

  const handler = serverless(server);
  return handler(event, context);
};
