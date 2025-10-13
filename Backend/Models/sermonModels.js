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
  videoId: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String
  },
  duration: {
    type: String,
    default: "45:00"
  },
  category: {
    type: String,
    enum: ['sunday-service', 'bible-study', 'special-service', 'youth', 'other'],
    default: 'sunday-service'
  },
  scripture: {
    type: String,
    default: ""
  },
  isFeatured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// ✅ Improved pre-save middleware for thumbnails
sermonSchema.pre('save', function(next) {
  if (this.videoId && !this.thumbnail) {
    // Generate YouTube thumbnail URL - try multiple qualities
    this.thumbnail = `https://img.youtube.com/vi/${this.videoId}/maxresdefault.jpg`;
  }
  next();
});

module.exports = mongoose.model("Sermon", sermonSchema);