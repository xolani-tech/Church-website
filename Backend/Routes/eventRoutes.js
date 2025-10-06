const express = require("express");
const router = express.Router();
const Event = require("../Models/eventsModels");

// Add new events
router.post("/", async (req, res) => {
    try{
        const event = new Event(req.body);
        const savedEvent = await event.save();
        resjson(savedEvent);
    }catch (err) {
        res.status(500).json({message:err.message});
    }
});

// Get All Events
router.get("/", async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: err.message});
    }
});

module.exports = router 