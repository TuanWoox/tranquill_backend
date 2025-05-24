const BaseHandler = require("../baseHandler");
const SettingDAO = require("../../../DAO/SettingDAO");

class UpdateSettingHandler extends BaseHandler {
  async execute(req, res) {
    const newSetting = await SettingDAO.updateSetting(req.body);
    return newSetting;
  }
}

module.exports = UpdateSettingHandler;
