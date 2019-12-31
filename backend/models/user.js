const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  points: {
    type: Number,
    default: 0,
    required: true
  }
});

module.exports = mongoose.model("User", userSchema);
