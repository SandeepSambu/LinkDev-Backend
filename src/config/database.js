const mongoose = require("mongoose");

const connectDB = async () => {
  const uri = process.env.MONGO_CONNECTION_STRING;

  if (!uri) {
    console.error("❌ MONGO_CONNECTION_STRING is not defined in env vars.");
    return;
  }

  try {
    await mongoose.connect(uri);
    console.log("✅ Connected to database successfully...");
  } catch (err) {
    console.error("❌ Database connection error:", err.message);
  }
};

module.exports = connectDB;
