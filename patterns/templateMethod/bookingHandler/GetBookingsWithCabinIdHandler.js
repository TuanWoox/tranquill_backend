const BaseHandler = require("../baseHandler");
const BookingDAO = require("../../../DAO/BookingDAO");

class GetBookingsWithCabinIdHandler extends BaseHandler {
  async execute(req, res) {
    return await BookingDAO.findBookingByCabinId(req.query.cabinId);
  }
}

module.exports = GetBookingsWithCabinIdHandler;
