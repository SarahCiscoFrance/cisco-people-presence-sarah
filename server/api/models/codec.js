const mongoose = require("mongoose");

const codecSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  macAddress: {
    type: String,
    required: true,
    unique: true
  },
  coordinates: {
    x: {
      type: Number,
      default: 0
    },
    y: {
      type: Number,
      default: 0
    }
  },
  peoplePresence: {
    type: String,
    default: "No"
  },
  peopleCount: {
    type: Number,
    default: 0
  },
  ambientNoise: {
    type: Number,
    default: 0
  },
  drynessScore: {
    type: Number,
    default: 0
  },
  navigators: {
    type: Array,
    default: 0
  },
  bookings: {
    type: Array
  }
});

module.exports = mongoose.model("Codec", codecSchema);
