const mongoose = require("mongoose");

const user = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  age: { type: Number, required: true, min: 1, max: 150 },
  profileImages: [{ type: Buffer }],
  email: { type: String, required: true },
  password: { type: String, required: true },
  roleName: { type: String, default: "writer" },
  comment: { type: mongoose.Types.ObjectId, ref: "comment" },
});

module.exports = mongoose.model("user", user);
