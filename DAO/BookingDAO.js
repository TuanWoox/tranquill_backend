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
  async findBookingByCabinId(cabinId) {
    try {
      return Booking.find({
        cabin: cabinId,
        status: { $ne: "checked-out" },
      })
        .populate("user")
        .populate("cabin");
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
      return Booking.findById(bookingObjectId)
        .populate("cabin")
        .populate("user");
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
      )
        .populate("cabin")
        .populate("user");
    } catch (err) {
      throw err;
    }
  }

  async getBookedDatesByCabinId(cabinId) {
    try {
      const id = new mongoose.Types.ObjectId(cabinId);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set to beginning of the day
      const bookings = await Booking.find({
        cabin: id,
        status: "confirmed",
      });
      return bookings;
    } catch (err) {
      throw err;
    }
  }

  async save(booking) {
    try {
      const newBooking = new Booking(booking);
      return await newBooking.save();
    } catch (err) {
      throw new Error(`Error creating booking in DAO: ${error.message}`);
    }
  }
}

// Create and freeze the singleton instance
const instance = new BookingDAO();
Object.freeze(instance);

// Export the singleton instance
module.exports = instance;
