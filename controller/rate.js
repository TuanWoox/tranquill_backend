const RateDAO = require("../DAO/RateDAO");
const ratePrototype = require("../patterns/prototype/ratePrototype");

module.exports.getCabinRating = async function (req, res) {
  try {
    const cabinId = req.params.cabinId;
    const rateList = await RateDAO.getCabinRatingByCabinId(cabinId);
    if (!rateList) {
      return res.status(404).json({ message: "Cabin rating not found" });
    }
    return res.status(200).json(rateList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.createRate = async function (req, res) {
  try {
    const { id: userId } = req.user;
    const { bookId, cabinId, rating, comment } = req.body;

    const clonedRate = await ratePrototype.clone(
      userId,
      bookId,
      cabinId,
      rating,
      comment
    );
    const savedRate = await RateDAO.save(clonedRate);
    return res.status(201).json({
      message: "Rate created successfully",
      rate: savedRate,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
