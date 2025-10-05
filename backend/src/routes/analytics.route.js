const express = require("express");
const router = express.Router();
const Borrow = require("../models/Borrow");
const User = require("../models/User");
const mongoose = require("mongoose");

// GET /api/analytics/top-users -> top 3 users (active borrows + historical borrows)
router.get("/top-users", async (req, res) => {
  try {
    // aggregate borrow counts per user
    const pipeline = [
      {
        $group: {
          _id: "$user",
          totalBorrows: { $sum: 1 },
          activeBorrows: {
            $sum: { $cond: [{ $eq: ["$returnedAt", null] }, 1, 0] },
          },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $project: {
          _id: 0,
          userId: "$_id",
          name: "$user.name",
          email: "$user.email",
          totalBorrows: 1,
          activeBorrows: 1,
        },
      },
      { $sort: { totalBorrows: -1, activeBorrows: -1 } },
      { $limit: 3 },
    ];

    const top = await Borrow.aggregate(pipeline);
    res.json(top);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/analytics/daily-borrows -> count borrows per day in last 7 days
router.get("/daily-borrows", async (req, res) => {
  try {
    const today = new Date();
    const past7 = new Date();
    past7.setDate(today.getDate() - 6); // include today -> 7 days
    past7.setHours(0, 0, 0, 0);

    const pipeline = [
      { $match: { borrowedAt: { $gte: past7 } } },
      {
        $project: {
          day: { $dateToString: { format: "%Y-%m-%d", date: "$borrowedAt" } },
        },
      },
      { $group: { _id: "$day", count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ];

    const results = await Borrow.aggregate(pipeline);

    // build full 7-day list ensuring days with 0 are present
    const days = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(past7);
      d.setDate(past7.getDate() + i);
      const key = d.toISOString().slice(0, 10);
      const match = results.find((r) => r._id === key);
      days.push({ day: key, count: match ? match.count : 0 });
    }

    res.json(days);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
