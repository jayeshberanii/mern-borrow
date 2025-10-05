const express = require("express");
const router = express.Router();
const Borrow = require("../models/Borrow");
const User = require("../models/User");
const Book = require("../models/Book");

// POST /api/borrow { userId, bookId } -> borrow a book
router.post("/", async (req, res) => {
  try {
    const { userId, bookId } = req.body;
    if (!userId || !bookId)
      return res.status(400).json({ error: "userId and bookId required" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ error: "Book not found" });

    // check if user already has this book active
    const alreadyBorrowed = await Borrow.findOne({
      user: userId,
      book: bookId,
      returnedAt: null,
    });
    if (alreadyBorrowed)
      return res
        .status(400)
        .json({
          error: "Book already borrowed by user (active borrow exists)",
        });

    // count active borrows for user
    const activeCount = await Borrow.countDocuments({
      user: userId,
      returnedAt: null,
    });
    if (activeCount >= 2)
      return res
        .status(400)
        .json({ error: "User has reached max active borrows (2)" });

    const borrow = new Borrow({ user: userId, book: bookId });
    await borrow.save();

    res.status(201).json(borrow);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/borrow/return { userId, bookId } -> return a book
router.post("/return", async (req, res) => {
  try {
    const { userId, bookId } = req.body;
    if (!userId || !bookId)
      return res.status(400).json({ error: "userId and bookId required" });

    const borrow = await Borrow.findOne({
      user: userId,
      book: bookId,
      returnedAt: null,
    });
    if (!borrow)
      return res
        .status(404)
        .json({ error: "Active borrow not found for this user and book" });

    borrow.returnedAt = new Date();
    await borrow.save();

    res.json(borrow);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/borrow/user/:userId -> show user's borrowed books (active and history)
router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const borrows = await Borrow.find({ user: userId }).populate("book").lean();
    res.json(borrows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
