const BaseHandler = require("../baseHandler");
const CabinDAO = require("../../../DAO/CabinDAO");
const { duplicateImage } = require("../../../utils/utils");
class DuplicateCabinHandler extends BaseHandler {
  async execute(req, res) {
    const duplicatedCabin = await CabinDAO.duplicateCabinById(req.body.id);
    const newImageFilename = await duplicateImage(duplicatedCabin.image);
    duplicatedCabin.image = newImageFilename;
    return await CabinDAO.save(duplicatedCabin);
  }
}

module.exports = DuplicateCabinHandler;
