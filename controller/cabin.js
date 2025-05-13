const CabinDAO = require("../DAO/CabinDAO");
const CabinPrototype = require("../patterns/prototype/cabinPrototype");
module.exports.getAllCabins = async function (req, res) {
  try {
    const cabins = await CabinDAO.getAllCabins();
    return res.status(200).json(cabins);
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
    return res.status(200).json(duplicatedCabin);
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
