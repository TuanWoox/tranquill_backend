const CreateRateHandler = require("./CreateRateHandler");
const GetCabinRateHandler = require("./GetCabinRateHandler");
const GetRateHandler = require("./GetRateHandler");
const UpdateRateHandler = require("./UpdateRateHandler");
const DeleteRateHandler = require("./DeleteRateHandler");
module.exports = {
  createRateHandler: new CreateRateHandler(),
  getCabinRateHandler: new GetCabinRateHandler(),
  getRateHandler: new GetRateHandler(),
  updateRateHandler: new UpdateRateHandler(),
  deleteRateHandler: new DeleteRateHandler(),
};
