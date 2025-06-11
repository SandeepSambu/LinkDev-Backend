const mongoose = require("mongoose");

const connectDB = async () => {
  const uri = process.env.MONGO_CONNECTION_STRING;
  if (!uri) {
    throw new Error("MONGO_CONNECTION_STRING is not defined");
  }
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("✅ MongoDB connected");
};

module.exports = connectDB;
