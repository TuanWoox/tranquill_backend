const BaseHandler = require("../baseHandler");
const BookingDAO = require("../../../DAO/BookingDAO");

class UpdateBookingHandler extends BaseHandler {
  async execute(req, res) {
    const { id } = req.user;
    const { bookingId, ...updatedData } = req.body.data;

    const booking = await BookingDAO.findBookingById(bookingId);

    if (
      !booking ||
      (req.user.role !== "admin" && booking.user._id.toString() !== id)
    ) {
      throw { status: 404, message: "Booking not found or unauthorized" };
    }

    if (new Date(booking.startDate) <= new Date()) {
      throw {
        status: 400,
        message: "Start date has passed, you cannot update this booking.",
      };
    }

    return await BookingDAO.updateBookingById(bookingId, updatedData);
  }
}

module.exports = UpdateBookingHandler;
