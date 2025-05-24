const BaseHandler = require("../baseHandler");
const BookingDAO = require("../../../DAO/BookingDAO");
const bookingPrototype = require("../../prototype/bookingPrototype");

class CreateBookingHandler extends BaseHandler {
  async execute(req, res) {
    const { id } = req.user;
    const clonedBooking = await bookingPrototype.clone(
      req.body.startDate,
      req.body.endDate,
      req.body.numGuests,
      req.body.cabinPrice,
      req.body.extrasPrice,
      req.body.hasBreakfast,
      req.body.observations,
      id,
      req.body.cabin
    );

    const savedBooking = await BookingDAO.save(clonedBooking);
    return { message: "Booking Successfully", savedBooking };
  }
}

module.exports = CreateBookingHandler;
