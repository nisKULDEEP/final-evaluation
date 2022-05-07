const mongoose = require("mongoose");

const comment = new mongoose.Schema({
  body: { type: String, required: true },
  timestap: { type: String, default: Date.now().toString() },
  bookId: { type: mongoose.Types.ObjectId, ref: "book" },
});

module.exports = mongoose.model("comment", comment);
