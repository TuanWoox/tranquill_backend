const CabinDAO = require("../DAO/CabinDAO");
module.exports.getAllCabins = async function (req, res) {
  try {
    const cabins = await CabinDAO.getAllCabins();
    return res.status(200).json({ cabins });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
