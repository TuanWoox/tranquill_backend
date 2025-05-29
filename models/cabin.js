const mongoose = require("mongoose");
const Booking = require("./OTP");

const cabinSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    maxCapacity: { type: Number, required: true },
    regularPrice: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    description: { type: String },
    image: { type: String },
  },
  {
    timestamps: true,
  }
);
cabinSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    try {
      await Booking.deleteMany({ cabin: doc._id });
      console.log(`All bookings for cabin ${doc._id} deleted.`);
    } catch (err) {
      console.error("Error deleting related bookings:", err);
    }
  }
});

module.exports = mongoose.model("Cabin", cabinSchema);
