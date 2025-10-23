const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

console.log("✅ Environment variables loaded");
console.log("PORT:", process.env.PORT);
console.log("MONGO_URI:", process.env.MONGO_URI ? "Loaded successfully" : "❌ Not loaded!");

// ========== MOVE ROUTES UP HERE - BEFORE startServer() ==========
const eventRoutes = require("./Routes/eventRoutes");
const sermonRoutes = require("./Routes/sermonRoutes"); 
const blogRoutes = require("./Routes/blogRoutes");

app.use("/api/events", eventRoutes);
app.use("/api/sermons", sermonRoutes); 
app.use("/api/blogs", blogRoutes);
console.log("✅ Routes registered");
// ========== END ROUTES ==========

// Basic test route
app.get("/", (req, res) => res.send("API is running..."));

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ 
    status: "OK", 
    database: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
    timestamp: new Date().toISOString()
  });
});

// Debug route to check all registered routes
app.get("/api/debug-routes", (req, res) => {
  const routes = [];
  app._router.stack.forEach(middleware => {
    if (middleware.route) {
      routes.push({
        path: middleware.route.path,
        methods: Object.keys(middleware.route.methods)
      });
    }
  });
  res.json({ routes: routes });
});

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
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📍 Test these endpoints:`);
      console.log(`   - http://localhost:${PORT}/api/events`);
      console.log(`   - http://localhost:${PORT}/api/sermons`);
      console.log(`   - http://localhost:${PORT}/api/blogs`);

      console.log(`   - http://localhost:${PORT}/api/debug-routes`);
    });

  } catch (err) {
    console.error("❌ DB connection error:", err);
  }
};

// Start everything
startServer();