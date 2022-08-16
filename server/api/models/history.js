const mongoose = require("mongoose");

const historySchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  codecMacAddress: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  value: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    expires: "15d", //the record will be deleted after 15 days
    default: Date.now
  }
});

module.exports = mongoose.model("History", historySchema);
