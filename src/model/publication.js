const mongoose = require("mongoose");

const publication = new mongoose.Schema({
  name: { type: String, required: true },
  timestap: { type: String, default: Date.now().toString() },
});

module.exports = mongoose.model("publication", publication);
