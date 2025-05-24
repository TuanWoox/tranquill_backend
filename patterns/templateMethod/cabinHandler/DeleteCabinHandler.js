const BaseHandler = require("../baseHandler");
const CabinDAO = require("../../../DAO/CabinDAO");
class DeleteCabinHandler extends BaseHandler {
  async execute(req, res) {
    return await CabinDAO.deleteCabinById(req.body.id);
  }
}

module.exports = DeleteCabinHandler;
