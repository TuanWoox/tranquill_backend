const BaseHandler = require("../baseHandler");
const SettingDAO = require("../../../DAO/SettingDAO");
const { updateSettingSchema } = require("../../../joi/validateSchema");
class UpdateSettingHandler extends BaseHandler {
  async execute(req, res) {
    const { error, value } = updateSettingSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    if (error) {
      const err = new Error(error.details.map((d) => d.message).join(", "));
      err.status = 400;
      throw err;
    }
    const newSetting = await SettingDAO.updateSetting(value);
    return newSetting;
  }
}

module.exports = UpdateSettingHandler;
