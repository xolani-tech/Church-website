const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // ✅ Load .env at the very top

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Debug: confirm that .env variables are loaded
console.log("✅ Environment variables loaded");
console.log("PORT:", process.env.PORT);
console.log("MONGO_URI:", process.env.MONGO_URI ? "Loaded successfully" : "❌ Not loaded!");

// Start server only after DB connects successfully
const startServer = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing from .env file");
    }

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to MongoDB Atlas");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

  } catch (err) {
    console.error("❌ DB connection error:", err);
  }
};

// Routes
const eventRoutes = require("./Routes/eventRoutes");
app.use("/api/events", eventRoutes);

const semonRoutes =requi("./Routes/sermonRoutes");
app.use("/api/events", semonRoutes);

// Basic test route
app.get("/", (req, res) => res.send("API is running..."));

// Start everything
startServer();
