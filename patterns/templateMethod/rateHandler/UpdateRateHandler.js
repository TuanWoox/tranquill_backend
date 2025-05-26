const BaseHandler = require("../baseHandler");
const RateDAO = require("../../../DAO/RateDAO");
const { rateUpdateSchema } = require("../../../joi/validateSchema");
class UpdateRateHandler extends BaseHandler {
  async execute(req, res) {
    const { error, value } = rateUpdateSchema.validate(req.body);
    if (error) {
      throw {
        status: 400,
        message: error.details[0].message,
      };
    }

    const { rateId } = req.params;
    const { rating, comment } = value;

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
