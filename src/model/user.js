const mongoose = require("mongoose");

const user = new mongoose.Schema({
  firstName: { type: String, required: true, minLength: 3, maxlength: 30 },
  lastName: { type: String, minLength: 3, maxlength: 30 },
  age: { type: Number, required: true, min: 1, max: 150 },
  profileImages: [{ type: Buffer }],
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roleName: { type: String, default: "writer" },
  comment: { type: mongoose.Types.ObjectId, ref: "comment" },
});

module.exports = mongoose.model("user", user);
