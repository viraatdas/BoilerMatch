const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: true
  },
  lastName: {
    type: String,
    trim: true,
    required: true
  },
  graduationYear: {
    type: Number,
    default: 0,
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
  }
});

module.exports = mongoose.model("User", userSchema);
