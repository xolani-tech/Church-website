const express = require("express");
const router = express.Router();
const Event = require("../Models/eventsModels");

// POST (Create new event)
router.post("/", async (req, res) => {
  try {
    const event = new Event(req.body);
    const savedEvent = await event.save();
    res.status(201).json(savedEvent);
  } catch (error) {  // Fixed: changed 'err' to 'error'
    console.error("Error saving event:", error);
    res.status(400).json({ message: error.message });
  }
});

// GET (Fetch all events)
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {  // Fixed: changed 'err' to 'error'
    console.error("Error fetching events:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;