const mongoose = require("mongoose");
const { differenceInCalendarDays } = require("date-fns");

const bookingSchema = new mongoose.Schema(
  {
    createdAt: { type: Date, default: Date.now },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    numGuests: { type: Number, required: true },
    cabinPrice: { type: Number, required: true },
    extrasPrice: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["unconfirmed", "confirmed", "checked-in", "checked-out"],
      default: "unconfirmed",
    },
    hasBreakfast: { type: Boolean, default: false },
    isPaid: { type: Boolean, default: false },
    observations: { type: String },
    cabin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cabin",
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual: numNights
bookingSchema.virtual("numDates").get(function () {
  return differenceInCalendarDays(this.endDate, this.startDate);
});

// Virtual: totalPrice
bookingSchema.virtual("totalPrice").get(function () {
  return this.cabinPrice + this.extrasPrice;
});

module.exports = mongoose.model("Booking", bookingSchema);
