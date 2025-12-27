const express = require("express");
const multer = require("multer");
const Hero = require("../Models/eventHeroModels");

const router = express.Router();

// Multer storage for background image
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage });

// POST /api/hero - create or update hero
router.post("/create", upload.single("backgroundImage"), async (req, res) => {
  try {
    const { title, subtitle, scripture, registerBtnText, learnBtnText, registerBtnLink, learnBtnLink } = req.body;

    const hero = await Hero.create({
      backgroundImage: `/uploads/${req.file.filename}`,
      title,
      subtitle,
      scripture,
      registerBtnLink,
      learnBtnLink
    });

    res.json({ success: true, hero });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

// GET /api/hero - fetch latest hero
router.get("/", async (req, res) => {
  try {
    const hero = await Hero.findOne().sort({ createdAt: -1 });
    res.json({ success: true, hero });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

module.exports = router;
