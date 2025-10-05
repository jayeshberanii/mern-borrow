const express = require("express");
const router = express.Router();
const User = require("../models/User");

// GET /api/users -> list users
router.get("/", async (req, res) => {
  try {
    const users = await User.find().lean();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
