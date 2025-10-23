const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String },
  author: { type: String, default: 'NJIM Team' },
  tags: [String]
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
