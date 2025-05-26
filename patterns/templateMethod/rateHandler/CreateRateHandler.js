const BaseHandler = require("../baseHandler");
const RateDAO = require("../../../DAO/RateDAO");
const ratePrototype = require("../../prototype/ratePrototype");
const CabinDAO = require("../../../DAO/CabinDAO");
const BookingDAO = require("../../../DAO/BookingDAO");
const { rateSchema } = require("../../../joi/validateSchema");
class CreateRateHandler extends BaseHandler {
  async execute(req, res) {
    // Validate request body
    const { error, value } = rateSchema.validate(req.body);
    if (error) {
      throw {
        status: 400,
        message: error.details[0].message,
      };
    }

    const { id: userId } = req.user;
    const { bookingId, cabinId, rating, comment } = value;

    const raw = ratePrototype.clone();
    const clonedRate = ratePrototype.customize(raw, {
      userId,
      cabinId,
      bookingId,
      rating,
      comment,
    });

    const foundBooking = await BookingDAO.findBookingById(bookingId);
    if (!foundBooking || foundBooking.user._id.toString() !== userId) {
      throw {
        status: 400,
        message: "Booking not found or you are not authorize",
      };
    }

    const foundCabin = await CabinDAO.getOneCabinById(cabinId);
    if (!foundCabin || foundBooking.cabin._id.toString() !== cabinId) {
      throw {
        status: 400,
        message: "Cabin is not valid",
      };
    }

    const savedRate = await RateDAO.save(clonedRate);
    return {
      message: "Rate successfully",
      rate: savedRate,
    };
  }
}

module.exports = CreateRateHandler;
