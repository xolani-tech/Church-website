const express = require("express");
const router = express.Router();
const Sermon = require("../Models/sermonModels");

// GET all sermons (with optional filtering)
router.get("/", async (req, res) => {
  try {
    const { category, featured, limit } = req.query;
    
    let query = {};
    
    // Filter by category if provided
    if (category) {
      query.category = category;
    }
    
    // Filter featured sermons if requested
    if (featured === 'true') {
      query.isFeatured = true;
    }
    
    let sermonsQuery = Sermon.find(query).sort({ date: -1 });
    
    // Limit results if specified
    if (limit) {
      sermonsQuery = sermonsQuery.limit(parseInt(limit));
    }
    
    const sermons = await sermonsQuery;
    res.status(200).json(sermons);
    
  } catch (error) {
    console.error("Error fetching sermons:", error);
    res.status(500).json({ message: error.message });
  }
});

// GET single sermon by ID
router.get("/:id", async (req, res) => {
  try {
    const sermon = await Sermon.findById(req.params.id);
    if (!sermon) {
      return res.status(404).json({ message: "Sermon not found" });
    }
    res.status(200).json(sermon);
  } catch (error) {
    console.error("Error fetching sermon:", error);
    res.status(500).json({ message: error.message });
  }
});

// POST create new sermon
router.post("/", async (req, res) => {
  try {
    const sermon = new Sermon(req.body);
    const savedSermon = await sermon.save();
    res.status(201).json(savedSermon);
  } catch (error) {
    console.error("Error creating sermon:", error);
    res.status(400).json({ message: error.message });
  }
});

// PUT update sermon
router.put("/:id", async (req, res) => {
  try {
    const sermon = await Sermon.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!sermon) {
      return res.status(404).json({ message: "Sermon not found" });
    }
    
    res.status(200).json(sermon);
  } catch (error) {
    console.error("Error updating sermon:", error);
    res.status(400).json({ message: error.message });
  }
});

// DELETE sermon
router.delete("/:id", async (req, res) => {
  try {
    const sermon = await Sermon.findByIdAndDelete(req.params.id);
    
    if (!sermon) {
      return res.status(404).json({ message: "Sermon not found" });
    }
    
    res.status(200).json({ message: "Sermon deleted successfully" });
  } catch (error) {
    console.error("Error deleting sermon:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;