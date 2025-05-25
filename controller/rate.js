const RateHandler = require("../patterns/templateMethod/rateHandler/index");

module.exports.getCabinRating = async function (req, res) {
  RateHandler.getCabinRateHandler.handle(req, res);
};

module.exports.getRateByBookingId = async function (req, res) {
  RateHandler.getRateHandler.handle(req, res);
};

module.exports.createRate = async function (req, res) {
  RateHandler.createRateHandler.handle(req, res);
};

module.exports.updateRate = async function (req, res) {
  RateHandler.updateRateHandler.handle(req, res);
};

module.exports.deleteRate = async function (req, res) {
  RateHandler.deleteRateHandler.handle(req, res);
};
