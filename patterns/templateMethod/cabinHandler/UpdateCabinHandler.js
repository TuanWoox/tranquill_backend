// handlers/cabin/UpdateCabinHandler.js
const BaseHandler = require("../baseHandler");
const CabinDAO = require("../../../DAO/CabinDAO");
const { deleteOldImage } = require("../../../utils/utils");

class UpdateCabinHandler extends BaseHandler {
  async execute(req, res) {
    const { name, maxCapacity, regularPrice, discount, description, cabinId } =
      req.body;
    const newImage = req.file ? req.file.filename : "";

    if (!cabinId) {
      const error = new Error("Cabin ID is required");
      error.status = 400;
      throw error;
    }

    if (!name || !maxCapacity || !regularPrice) {
      const error = new Error(
        "Name, max capacity, and regular price are required"
      );
      error.status = 400;
      throw error;
    }

    const currentCabin = await CabinDAO.getOneCabinById(cabinId);
    if (!currentCabin) {
      const error = new Error("Cabin not found");
      error.status = 404;
      throw error;
    }

    const updateData = {
      name,
      maxCapacity: parseInt(maxCapacity),
      regularPrice: parseFloat(regularPrice),
      discount: discount ? parseFloat(discount) : 0,
      description: description || "",
    };

    if (newImage) {
      if (currentCabin.image) {
        deleteOldImage(currentCabin.image);
      }
      updateData.image = newImage;
    }

    const updatedCabin = await CabinDAO.updateCabinById(updateData, cabinId);

    if (!updatedCabin) {
      const error = new Error("Cabin not found");
      error.status = 404;
      throw error;
    }

    return updatedCabin;
  }
}

module.exports = UpdateCabinHandler;
