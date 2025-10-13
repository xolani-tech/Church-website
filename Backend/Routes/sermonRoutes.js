const express = require("express");
const router = express.Router();
const Sermon = require("../Models/sermonModels");

// GET all sermons
router.get("/", async (req, res) => {
  try {
    console.log("GET /api/sermons - Fetching sermons");
    
    const { limit } = req.query;
    let sermonsQuery = Sermon.find().sort({ date: -1 });
    
    if (limit) {
      sermonsQuery = sermonsQuery.limit(parseInt(limit));
    }
    
    const sermons = await sermonsQuery;
    console.log(`Found ${sermons.length} sermons`);
    
    res.status(200).json(sermons);
    
  } catch (error) {
    console.error("Error fetching sermons:", error);
    res.status(500).json({ message: error.message });
  }
});

// POST create new sermon
router.post("/", async (req, res) => {
  try {
    console.log("POST /api/sermons - Creating new sermon");
    
    const sermon = new Sermon(req.body);
    const savedSermon = await sermon.save();
    
    console.log("Sermon created successfully:", savedSermon._id);
    res.status(201).json(savedSermon);
    
  } catch (error) {
    console.error("Error creating sermon:", error);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;