const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String },
  price: { type: String },
  copies: { type: Number, default: 1 }, // track number of copies optionally
}, { timestamps: true });

module.exports = mongoose.model("Book", bookSchema);
