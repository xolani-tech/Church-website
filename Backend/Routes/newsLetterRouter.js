const express = require("express");
const Newsletter = require("../Models/newsLetterModels"); // ensure path matches your folder structure
const router = express.Router();

// POST /api/newsletter/subscribe
router.post("/subscribe", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: "Email is required." });
  }

  try {
    const normalizedEmail = email.toLowerCase().trim();

    // Check for existing subscriber
    const existing = await Newsletter.findOne({ email: normalizedEmail });
    if (existing) {
      return res.status(409).json({ success: false, message: "Email is already subscribed." });
    }

    // Save new subscriber
    const newSubscriber = new Newsletter({ email: normalizedEmail });
    await newSubscriber.save();

    return res.status(201).json({ success: true, message: "Successfully subscribed!" });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
});

// GET /api/newsletter/
router.get("/", async (req, res) => {
  try {
    const subscribers = await Newsletter.find().sort({ subscribedAt: -1 });
    res.json({ success: true, subscribers });
  } catch (err) {
    console.error("Error fetching subscribers:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
