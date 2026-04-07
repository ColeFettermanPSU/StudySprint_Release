const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
    trim: true
  },
  minutes: {
    type: Number,
    required: true,
    min: 1
  },
  notes: {
    type: String,
    default: "",
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Session", sessionSchema);