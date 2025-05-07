const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  numNights: { type: Number, required: true },
  numGuests: { type: Number, required: true },
  cabinPrice: { type: Number, required: true },
  extrasPrice: { type: Number, default: 0 },
  totalPrice: { type: Number, required: true },
  status: {
    type: String,
    enum: ["unconfirmed", "confirmed", "checked-in", "checked-out"],
    default: "unconfirmed",
  },
  hasBreakfast: { type: Boolean, default: false },
  isPaid: { type: Boolean, default: false },
  observations: { type: String },
  cabin: { type: mongoose.Schema.Types.ObjectId, ref: "Cabin", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Booking", bookingSchema);
