const GetSettingHandler = require("./GetSettingHandler");
const UpdateSettingHandler = require("./UpdateSettingHandler");

module.exports = {
  getSettingHandler: new GetSettingHandler(),
  updateSettingHandler: new UpdateSettingHandler(),
};
