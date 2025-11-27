// Routes/getInTouchRouter.js
const express = require("express");
const GetInTouch = require("../Models/getInTouchModels"); // must match file name exactly

const router = express.Router();

//POST
router.post("/", async (req, res) => {
  try {
    const { fullName, email, message } = req.body;

    if (!fullName || !email || !message) {
      return res.status(400).json({ error: "Please fill required fields" });
    }

    const newEntry = new GetInTouch({ fullName, email, message });
    await newEntry.save();

    res.status(201).json({ message: "Thank you for getting in Touch" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

//GET Method
router.get("/", async (req, res) => {
    try {
        const messages = (await GetInTouch.find()).toSorted({ createAt: -1 });
        res.status(200).json({ success: true, messages });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "server error"})
    }
});

module.exports = router;
