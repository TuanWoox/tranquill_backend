const BaseHandler = require("../baseHandler");
const RateDAO = require("../../../DAO/RateDAO");
const Rate = require("../../../models/rate");
class UpdateRateHandler extends BaseHandler {
  async execute(req, res) {
    const { rateId } = req.params;
    const { rating, comment } = req.body;
    const updatedRate = await RateDAO.updateRateById(rateId, {
      rating,
      comment,
    });
    if (!updatedRate) {
      throw { status: 404, message: "Rate not found" };
    }
    return updatedRate;
  }
}

module.exports = UpdateRateHandler;
