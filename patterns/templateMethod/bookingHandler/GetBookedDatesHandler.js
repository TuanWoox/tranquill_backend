const BaseHandler = require("../baseHandler");
const BookingDAO = require("../../../DAO/BookingDAO");
const { eachDayOfInterval } = require("date-fns");

class GetBookedDatesHandler extends BaseHandler {
  async execute(req, res) {
    const { cabinId } = req.params;
    const booked = await BookingDAO.getBookedDatesByCabinId(cabinId);

    return booked
      .map((booking) =>
        eachDayOfInterval({
          start: new Date(booking.startDate),
          end: new Date(booking.endDate),
        })
      )
      .flat();
  }
}

module.exports = GetBookedDatesHandler;
