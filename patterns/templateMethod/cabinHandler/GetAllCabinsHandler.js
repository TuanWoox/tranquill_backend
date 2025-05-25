// handlers/cabin/GetAllCabinsHandler.js
const BaseHandler = require("../baseHandler");
const CabinDAO = require("../../../DAO/CabinDAO");

class GetAllCabinsHandler extends BaseHandler {
  async execute(req, res) {
    return await CabinDAO.getAllCabins();
  }
}

module.exports = GetAllCabinsHandler;
