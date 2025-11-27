const mongoose = require("mongoose");

const newsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/.+\@.+\..+/, "Please provide a valid email address"]
  },
  subscribedAt: {
    type: Date,
    default: Date.now
  }
}, { collection: "newsLetterSubscription" });

module.exports = mongoose.model("Newsletter", newsletterSchema);
