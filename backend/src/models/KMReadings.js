const mongoose = require("mongoose");

const readingSchema = new mongoose.Schema({
  vehicleId: {
    type: String,
    required: true,
  },
  kmReading: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  createdOn: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model("Reading", readingSchema);
