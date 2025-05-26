const BaseHandler = require("../baseHandler");
const BookingDAO = require("../../../DAO/BookingDAO");
const bookingPrototype = require("../../prototype/bookingPrototype");
const { bookingSchema } = require("../../../joi/validateSchema");
const CabinDAO = require("../../../DAO/CabinDAO");

class CreateBookingHandler extends BaseHandler {
  async execute(req, res) {
    // Validate input
    const { error, value } = bookingSchema.validate(req.body);
    if (error) {
      throw {
        status: 400,
        message: error.details?.[0]?.message || "Invalid booking data",
      };
    }

    // Check if cabin exists
    const foundCabin = await CabinDAO.getOneCabinById(value.cabin);
    if (!foundCabin) {
      throw {
        status: 404,
        message: "Cabin not found",
      };
    }

    // Clone and customize booking
    const { id: userId } = req.user;
    const raw = bookingPrototype.clone();
    const clonedBooking = await bookingPrototype.customize(raw, {
      startDate: value.startDate,
      endDate: value.endDate,
      numGuests: value.numGuests,
      cabinPrice: value.cabinPrice,
      extrasPrice: value.extrasPrice,
      hasBreakfast: value.hasBreakfast,
      observations: value.observations,
      userId,
      cabinId: value.cabin,
    });

    // Save booking
    const savedBooking = await BookingDAO.save(clonedBooking);
    return { message: "Booking Successfully", savedBooking };
  }
}

module.exports = CreateBookingHandler;
