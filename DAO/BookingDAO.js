const Booking = require("../models/booking");
const mongoose = require("mongoose");

class BookingDAO {
  constructor() {
    // Ensure this constructor is only used once
    if (BookingDAO.instance) {
      return BookingDAO.instance;
    }

    BookingDAO.instance = this;
  }

  async findBookingByCustomerId(customerId) {
    try {
      const id = new mongoose.Types.ObjectId(customerId);
      return Booking.find({ user: id }).populate("cabin");
    } catch (err) {
      throw err;
    }
  }

  async deleteBookingById(bookingId) {
    try {
      const bookingObjectId = new mongoose.Types.ObjectId(bookingId);
      return Booking.findByIdAndDelete(bookingObjectId);
    } catch (err) {
      throw err;
    }
  }

  async findBookingById(bookingId) {
    try {
      const bookingObjectId = new mongoose.Types.ObjectId(bookingId);
      return Booking.findById(bookingObjectId).populate("cabin");
    } catch (err) {
      throw err;
    }
  }

  async updateBookingById(bookingId, updatedData) {
    try {
      const bookingObjectId = new mongoose.Types.ObjectId(bookingId);
      return Booking.findByIdAndUpdate(
        bookingObjectId,
        { $set: updatedData },
        { new: true }
      ).populate("cabin");
    } catch (err) {
      throw err;
    }
  }
}

// Create and freeze the singleton instance
const instance = new BookingDAO();
Object.freeze(instance);

// Export the singleton instance
module.exports = instance;
