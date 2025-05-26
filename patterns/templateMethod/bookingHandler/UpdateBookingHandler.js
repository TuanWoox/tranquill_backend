const BaseHandler = require("../baseHandler");
const BookingDAO = require("../../../DAO/BookingDAO");
const SettingDAO = require("../../../DAO/SettingDAO");
const { updateBookingSchema } = require("../../../joi/validateSchema");

class UpdateBookingHandler extends BaseHandler {
  async execute(req, res) {
    const { id, role } = req.user;
    const { bookingId, ...updatedData } = req.body.data;

    // Validate input
    const { error } = updateBookingSchema.validate(
      { bookingId, ...updatedData },
      { abortEarly: false }
    );
    if (error) {
      const err = new Error(error.details.map((d) => d.message).join(", "));
      err.status = 400;
      throw err;
    }

    // Find the booking
    const booking = await BookingDAO.findBookingById(bookingId);
    if (!booking || (role !== "admin" && booking.user._id.toString() !== id)) {
      const err = new Error("Booking not found or unauthorized.");
      err.status = 404;
      throw err;
    }

    // Check if booking is still editable
    if (booking.status !== "confirmed") {
      const err = new Error(
        "The booking has been confirmed, you cannot update."
      );
      err.status = 400;
      throw err;
    }

    // Get breakfast price from settings
    const settings = await SettingDAO.getSetting();

    // Recalculate extrasPrice on backend for safety
    const numDates = booking.numDates;
    const extrasPrice = updatedData.hasBreakfast
      ? updatedData.numGuests * settings.breakfastPrice * numDates
      : 0;

    updatedData.extrasPrice = extrasPrice;

    // Update the booking
    return await BookingDAO.updateBookingById(bookingId, updatedData);
  }
}

module.exports = UpdateBookingHandler;
