const BaseHandler = require("../baseHandler");
const RateDAO = require("../../../DAO/RateDAO");
const ratePrototype = require("../../prototype/ratePrototype");

class CreateRateHandler extends BaseHandler {
  async execute(req, res) {
    const { id: userId } = req.user;
    const { bookingId, cabinId, rating, comment } = req.body;
    const raw = ratePrototype.clone();
    const clonedRate = ratePrototype.customize(raw, {
      userId,
      cabinId,
      bookingId,
      rating,
      comment,
    });
    console.log("rate", clonedRate);

    const savedRate = await RateDAO.save(clonedRate);
    return {
      message: "Rate successfully",
      rate: savedRate,
    };
  }
}

module.exports = CreateRateHandler;
