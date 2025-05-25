const CabinHandler = require("../patterns/templateMethod/cabinHandler/index");
module.exports.getAllCabins = async function (req, res) {
  CabinHandler.getAllCabinsHandler.handle(req, res);
};
module.exports.getOneCabin = async function (req, res) {
  CabinHandler.getOneCabinHandler.handle(req, res);
};

module.exports.deleteCabin = async function (req, res) {
  CabinHandler.deleteCabinHandler.handle(req, res);
};

module.exports.duplicateCabin = async function (req, res) {
  CabinHandler.duplicateCabinHandler.handle(req, res);
};

module.exports.createCabin = async function (req, res) {
  CabinHandler.createCabinHandler.handle(req, res);
};
module.exports.updateCabin = async function (req, res) {
  CabinHandler.updateCabinHandler.handle(req, res);
};
