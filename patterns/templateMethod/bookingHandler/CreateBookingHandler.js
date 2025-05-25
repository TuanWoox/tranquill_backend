const BaseHandler = require("../baseHandler");
const BookingDAO = require("../../../DAO/BookingDAO");
const bookingPrototype = require("../../prototype/bookingPrototype");

class CreateBookingHandler extends BaseHandler {
  async execute(req, res) {
    const { id } = req.user;
    const raw = bookingPrototype.clone();
    const clonedBooking = await bookingPrototype.customize(raw, {
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      numGuests: req.body.numGuests,
      cabinPrice: req.body.cabinPrice,
      extrasPrice: req.body.extrasPrice,
      hasBreakfast: req.body.hasBreakfast,
      observations: req.body.observations,
      userId: id,
      cabinId: req.body.cabin,
    });

    const savedBooking = await BookingDAO.save(clonedBooking);
    return { message: "Booking Successfully", savedBooking };
  }
}

module.exports = CreateBookingHandler;
