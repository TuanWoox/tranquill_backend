const BaseHandler = require("../baseHandler");
const CabinDAO = require("../../../DAO/CabinDAO");
class GetOneCabinHandler extends BaseHandler {
  async execute(req, res) {
    return await CabinDAO.getOneCabinById(req.query.cabinId);
  }
}

module.exports = GetOneCabinHandler;
