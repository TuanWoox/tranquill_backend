const CabinDAO = require("../DAO/CabinDAO");
const CabinPrototype = require("../patterns/prototype/cabinPrototype");
const { deleteOldImage, duplicateImage } = require("../utils/utils");

module.exports.getAllCabins = async function (req, res) {
  try {
    const cabins = await CabinDAO.getAllCabins();
    return res.status(200).json(cabins);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports.getOneCabin = async function (req, res) {
  try {
    const cabin = await CabinDAO.getOneCabinById(req.query.cabinId);
    return res.status(200).json(cabin);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports.deleteCabin = async function (req, res) {
  try {
    const deletedCabin = await CabinDAO.deleteCabinById(req.body.id);
    return res.status(200).json(deletedCabin);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.duplicateCabin = async function (req, res) {
  try {
    const duplicatedCabin = await CabinDAO.duplicateCabinById(req.body.id);
    const newImageFilename = await duplicateImage(duplicatedCabin.image);
    duplicatedCabin.image = newImageFilename;
    const savedCabin = await CabinDAO.save(duplicatedCabin);
    return res.status(200).json(savedCabin);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.createCabin = async function (req, res) {
  try {
    // Get data from request
    const { name, maxCapacity, regularPrice, discount, description } = req.body;
    const image = req.file ? req.file.filename : ""; // Only filename

    // Use the prototype to create a new cabin object
    const newCabin = CabinPrototype.clone(
      name,
      maxCapacity,
      regularPrice,
      discount,
      description,
      image
    );

    const savedCabin = await CabinDAO.createCabin(newCabin);
    return res.status(201).json(savedCabin);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports.updateCabin = async function (req, res) {
  try {
    const { name, maxCapacity, regularPrice, discount, description, cabinId } =
      req.body;
    const newImage = req.file ? req.file.filename : "";

    // Validate required fields
    if (!cabinId) {
      return res.status(400).json({ message: "Cabin ID is required" });
    }

    if (!name || !maxCapacity || !regularPrice) {
      return res.status(400).json({
        message: "Name, max capacity, and regular price are required",
      });
    }

    // Get current cabin to access old image
    const currentCabin = await CabinDAO.getOneCabinById(cabinId);
    if (!currentCabin) {
      return res.status(404).json({ message: "Cabin not found" });
    }

    // Prepare update data
    const updateData = {
      name,
      maxCapacity: parseInt(maxCapacity),
      regularPrice: parseFloat(regularPrice),
      discount: discount ? parseFloat(discount) : 0,
      description: description || "",
    };

    // Handle image update and old image deletion
    if (newImage) {
      if (currentCabin.image) {
        deleteOldImage(currentCabin.image);
      }
      updateData.image = newImage;
    }

    // Update the cabin
    const updatedCabin = await CabinDAO.updateCabinById(updateData, cabinId);

    if (!updatedCabin) {
      return res.status(404).json({ message: "Cabin not found" });
    }

    res.status(200).json(updatedCabin);
  } catch (err) {
    console.error("Error updating cabin:", err);

    // Clean up new image if update fails
    if (req.file && req.file.filename) {
      deleteOldImage(req.file.filename);
    }

    res.status(500).json({ message: err.message });
  }
};
