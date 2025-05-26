const BaseHandler = require("../baseHandler");
const BookingDAO = require("../../../DAO/BookingDAO");
const SettingDAO = require("../../../DAO/SettingDAO");
const {
  updateBookingSchema,
  updateStatusBooking,
} = require("../../../joi/validateSchema");

class UpdateBookingHandler extends BaseHandler {
  async execute(req, res) {
    const { id, role } = req.user;
    const { bookingId, ...updatedData } = req.body.data;

    let schema;
    if (role === "admin") {
      schema = updateStatusBooking;
    } else {
      schema = updateBookingSchema;
    }

    // Validate input based on role
    const { error } = schema.validate(
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

    // Admin: only update status
    if (role === "admin") {
      return await BookingDAO.updateBookingById(bookingId, {
        status: updatedData.status,
        isPaid: updatedData.isPaid,
      });
    }

    // User: ensure booking is still editable
    if (booking.status !== "confirmed") {
      const err = new Error(
        "The booking has been confirmed, you cannot update."
      );
      err.status = 400;
      throw err;
    }

    // Get settings for breakfast price
    const settings = await SettingDAO.getSetting();
    const updatedBooking = await BookingDAO.updateBookingById(
      bookingId,
      updatedData
    );
    updatedBooking.calculateExtrasPrice(settings.breakfastPrice);

    // Update user booking fields
    return await BookingDAO.save(updatedBooking);
  }
}

module.exports = UpdateBookingHandler;
