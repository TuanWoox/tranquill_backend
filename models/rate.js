const mongoose = require("mongoose");

const rateSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cabin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cabin",
      required: true,
    },
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      maxlength: 500,
    },
  },
  {
    timestamps: true,
  }
);

rateSchema.index({ user: 1, booking: 1 }, { unique: true });

module.exports = mongoose.model("Rate", rateSchema);
