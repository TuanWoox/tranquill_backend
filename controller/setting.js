const SettingHandler = require("../patterns/templateMethod/settingHandler/index");

module.exports.getSetting = async function (req, res) {
  SettingHandler.getSettingHandler.handle(req, res);
};
module.exports.updateSetting = async function (req, res) {
  SettingHandler.updateSettingHandler.handle(req, res);
};
