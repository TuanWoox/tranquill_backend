const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  minBookingLength: { type: Number, default: 1 },
  maxBookingLength: { type: Number, default: 30 },
  maxNumberOfGuests: { type: Number, default: 10 },
  breakfastPrice: { type: Number, default: 0 },
});

module.exports = mongoose.model("Setting", settingsSchema);
