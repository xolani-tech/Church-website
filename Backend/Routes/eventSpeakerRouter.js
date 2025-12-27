const express = require("express");
const multer = require("multer");
const Speaker = require("../Models/eventSpeakerModels"); // no .js in CommonJS

const router = express.Router();

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// POST create a speaker
router.post("/create", upload.single("image"), async (req, res) => {
  try {
    const speaker = await Speaker.create({
      name: req.body.name,
      title: req.body.title,
      image: `/uploads/${req.file.filename}`,
    });

    res.json({ success: true, speaker });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

// GET all speakers
router.get("/", async (req, res) => {
  try {
    const speakers = await Speaker.find().sort({ createdAt: -1 });
    res.json({ success: true, speakers });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

module.exports = router;
