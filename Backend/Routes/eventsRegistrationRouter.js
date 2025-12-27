const express = require("express");
const router = express.Router();
const EventRegistration = require("../Models/eventsRegistationModels");

// Register for an event
router.post("/register", async (req, res) => {
    try {
        const newRegistration = await EventRegistration.create(req.body);
        res.status(201).json({
            success: true,
            message: "Registration successful",
            data: newRegistration
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
});

// Get all registrations
router.get("/", async (req, res) => {
    try {
        const registrations = await EventRegistration.find().sort({ createdAt: -1 });
        res.status(200).json(registrations);
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Get a single registration
router.get("/:id", async (req, res) => {
    try {
        const registration = await EventRegistration.findById(req.params.id);
        if (!registration)
            return res.status(404).json({ success: false, message: "Not found" });

        res.status(200).json(registration);
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Delete registration
router.delete("/:id", async (req, res) => {
    try {
        const deleted = await EventRegistration.findByIdAndDelete(req.params.id);
        if (!deleted)
            return res.status(404).json({ success: false, message: "Not found" });

        res.status(200).json({ success: true, message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;
