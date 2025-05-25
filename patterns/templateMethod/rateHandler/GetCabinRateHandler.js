const BaseHandler = require("../baseHandler");
const RateDAO = require("../../../DAO/RateDAO");

class GetCabinRateHandler extends BaseHandler {
  async execute(req, res) {
    const cabinId = req.params.cabinId;
    const rateList = await RateDAO.getCabinRatingByCabinId(cabinId);

    return rateList;
  }
}

module.exports = GetCabinRateHandler;
