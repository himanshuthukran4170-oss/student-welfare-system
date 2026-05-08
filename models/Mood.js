const mongoose = require("mongoose");

const moodSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  emoji: {
    type: String,
    required: true,
  },
  note: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Mood", moodSchema);