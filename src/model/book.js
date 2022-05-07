const mongoose = require("mongoose");

const book = new mongoose.Schema({
  likes: { type: Number, default: 0 },
  coverImage: { type: Buffer },
  content: { type: String, required: true },
  timestap: { type: String, default: Date.now().toString() },
  authorId: { type: mongoose.Types.ObjectId, ref: "user" },
  publicationId: { type: mongoose.Types.ObjectId, ref: "publicaion" },
  commentId: [{ type: mongoose.Types.ObjectId, ref: "comment" }],
});

module.exports = mongoose.model("book", book);
