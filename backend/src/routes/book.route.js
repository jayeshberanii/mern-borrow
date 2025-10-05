const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

// GET /api/books -> list books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find().lean();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
