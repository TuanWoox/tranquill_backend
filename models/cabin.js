const mongoose = require("mongoose");

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

module.exports = mongoose.model("Cabin", cabinSchema);
