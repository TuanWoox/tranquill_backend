const BaseHandler = require("../baseHandler");
const SettingDAO = require("../../../DAO/SettingDAO");

class GetSettingHandler extends BaseHandler {
  async execute(req, res) {
    const setting = await SettingDAO.getSetting();
    return setting;
  }
}

module.exports = GetSettingHandler;
