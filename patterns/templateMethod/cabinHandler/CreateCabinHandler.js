const BaseHandler = require("../baseHandler");
const CabinDAO = require("../../../DAO/CabinDAO");
const CabinPrototype = require("../../prototype/cabinPrototype");
class CreateCabinHandler extends BaseHandler {
  async execute(req, res) {
    const { name, maxCapacity, regularPrice, discount, description } = req.body;
    const image = req.file ? req.file.filename : "";
    const raw = CabinPrototype.clone();
    const newCabin = CabinPrototype.customize(raw, {
      name,
      maxCapacity,
      regularPrice,
      discount,
      description,
      image,
    });

    return await CabinDAO.createCabin(newCabin);
  }
}

module.exports = CreateCabinHandler;
