const BaseHandler = require("../baseHandler");
const BookingDAO = require("../../../DAO/BookingDAO");

class GetAllBookingsHandler extends BaseHandler {
  async execute(req, res) {
    const { id } = req.user;
    return await BookingDAO.findBookingByCustomerId(id);
  }
}

module.exports = GetAllBookingsHandler;
