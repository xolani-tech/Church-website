const express = require('express');
const router = express.Router();
const Blog = require('../Models/blogModels'); // path must match exactly

// GET all blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create a new blog
router.post('/', async (req, res) => {
  try {
    const { title, excerpt, content, image, author, tags } = req.body;
    if (!title || !excerpt || !content) {
      return res.status(400).json({ error: "Title, excerpt, and content are required" });
    }

    const newBlog = new Blog({ title, excerpt, content, image, author, tags });
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
