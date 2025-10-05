const mongoose = require("mongoose");

const borrowSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  borrowedAt: { type: Date, default: Date.now },
  returnedAt: { type: Date, default: null },
}, { timestamps: true });

// Index to ensure a user cannot have duplicate active borrow for same book easily
borrowSchema.index({ user: 1, book: 1, returnedAt: 1 });

module.exports = mongoose.model("Borrow", borrowSchema);
