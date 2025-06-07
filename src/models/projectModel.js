const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    tech: {
      type: [String],
      required: true,
    },
    git: {
      type: String,
      required: true,
      validate: {
        validator: (v) => /^(https?:\/\/)?(www\.)?github\.com\/.+/.test(v),
        message: "GitHub URL is invalid",
      },
    },
    demo: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Projects", projectSchema);
