const BaseHandler = require("../baseHandler");
const RateDAO = require("../../../DAO/RateDAO");

class DeleteRateHandler extends BaseHandler {
  async execute(req, res) {
    const { rateId } = req.params;
    const deletedRate = await RateDAO.deleteRateById(rateId);
    if (!deletedRate) {
      throw { status: 404, message: "Rate not found" };
    }
    return { message: "Rate successfully deleted" };
  }
}

module.exports = DeleteRateHandler;
