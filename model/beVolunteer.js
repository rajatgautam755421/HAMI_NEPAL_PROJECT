const mongoose = require("mongoose");
const volunteerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  address: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },

  age: {
    type: Number,
    required: true,
    min: 6,
    max: 255,
  },
  qualification: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  experience: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = new mongoose.model("volunteerSchema", volunteerSchema);
