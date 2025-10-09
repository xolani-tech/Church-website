const mongoose = require("mongoose");

const sermonSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    trim: true
  },
  speaker: { 
    type: String, 
    required: true,
    trim: true
  },
  date: { 
    type: Date, 
    required: true 
  },
  description: {
    type: String,
    maxlength: 500
  },
  videoUrl: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String, // URL to thumbnail image
    default: ""
  },
  duration: {
    type: String, // e.g., "45:30"
    default: ""
  },
  category: {
    type: String,
    enum: ['sunday-service', 'bible-study', 'special-service', 'youth', 'other'],
    default: 'sunday-service'
  },
  scripture: {
    type: String, // Main scripture reference
    default: ""
  },
  isFeatured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Sermon", sermonSchema);