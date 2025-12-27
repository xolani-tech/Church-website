const mongoose = require("mongoose");

const heroSchema = new mongoose.Schema({
  backgroundImage: { type: String, required: true }, // image URL
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  scripture: { type: String },
  registerBtnLink: { type: String, default: "#register" },
  learnBtnLink: { type: String, default: "#details" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Hero", heroSchema);
