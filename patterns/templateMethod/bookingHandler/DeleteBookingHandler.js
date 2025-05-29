const BaseHandler = require("../baseHandler");
const BookingDAO = require("../../../DAO/BookingDAO");
const { deleteOldImage } = require("../../../utils/utils");

class DeleteBookingHandler extends BaseHandler {
  async execute(req, res) {
    const { id } = req.user;
    const { id: bookingId } = req.body;

    const booking = await BookingDAO.findBookingById(bookingId);
    if (!booking || booking.user._id.toString() !== id) {
      throw { status: 404, message: "Booking not found or unauthorized" };
    }
    deleteOldImage(booking.image);

    return await BookingDAO.deleteBookingById(bookingId);
  }
}

module.exports = DeleteBookingHandler;
