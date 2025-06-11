const serverless = require("serverless-http");
const server = require("../src/app");

module.exports.handler = serverless(server);
