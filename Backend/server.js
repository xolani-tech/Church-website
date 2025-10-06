const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();


const app = express();
app.use(cors());
app.use(express.json());


// connecting to Mongodb
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch(err => console.error("❌ DB connection error:", err));

// Importng routes 
const eventRoutes = require("./Routes/eventRoutes");
app.use("/api/events", eventRoutes);

// Basic test run
app.get ("/", (req, res) => res.send("API is running..."));

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));