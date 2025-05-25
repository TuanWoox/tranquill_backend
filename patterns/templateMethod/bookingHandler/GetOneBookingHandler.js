const BaseHandler = require("../baseHandler");
const BookingDAO = require("../../../DAO/BookingDAO");

class GetOneBookingHandler extends BaseHandler {
  async execute(req, res) {
    const { id } = req.user;
    const { bookingId } = req.query;

    const foundBooking = await BookingDAO.findBookingById(bookingId);

    if (
      !foundBooking ||
      (req.user.role !== "admin" && foundBooking.user._id.toString() !== id)
    ) {
      throw { status: 404, message: "Booking not found or unauthorized" };
    }

    return foundBooking;
  }
}

module.exports = GetOneBookingHandler;
