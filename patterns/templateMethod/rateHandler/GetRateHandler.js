const BaseHandler = require("../baseHandler");
const RateDAO = require("../../../DAO/RateDAO");

class GetRateHandler extends BaseHandler {
  async execute(req, res) {
    const { bookingId } = req.params;
    const rate = await RateDAO.getRateByBookingId(bookingId);
    return rate;
  }
}

module.exports = GetRateHandler;
