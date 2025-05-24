const GetAllCabinsHandler = require("./GetAllCabinsHandler");
const GetOneCabinHandler = require("./GetOneCabinHandler");
const CreateCabinHandler = require("./CreateCabinHandler");
const UpdateCabinHandler = require("./UpdateCabinHandler");
const DeleteCabinHandler = require("./DeleteCabinHandler");
const DuplicateCabinHandler = require("./DuplicateCabinHandler");

module.exports = {
  getAllCabinsHandler: new GetAllCabinsHandler(),
  getOneCabinHandler: new GetOneCabinHandler(),
  createCabinHandler: new CreateCabinHandler(),
  updateCabinHandler: new UpdateCabinHandler(),
  deleteCabinHandler: new DeleteCabinHandler(),
  duplicateCabinHandler: new DuplicateCabinHandler(),
};
