const { string } = require("@hapi/joi");
const mongoose = require("mongoose");

const events = mongoose.Schema({
  nameOfEvent: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  reason: {
    type: String,
    required: [true, "Reason is required"],
    min: 6,
    max: 255,
  },
  importance: {
    type: Number,
    required: true,
    min: 6,
    max: 255,
    validate(value) {
      if (value < 1) {
        throw new Error("Importance factor must be in between 1 and 10");
      } else if (value > 10) {
        throw new Error("Importance factor must be in between 1 and 10");
      }
    },
  },
  image: {
    type: String,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = new mongoose.model("events", events);
