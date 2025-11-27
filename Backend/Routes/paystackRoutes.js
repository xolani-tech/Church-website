const express = require("express");
const router = express.Router();
const { initializePayment, verifyPayment } = require("../Controllers/paystackController");

// Initialize payment
router.post("/initialize", initializePayment);

// verify payment
router.get("/verify/:reference", verifyPayment);

module.exports = router;
