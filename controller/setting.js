const SettingDAO = require("../DAO/SettingDAO");
module.exports.getSetting = async function (req, res) {
  try {
    const setting = await SettingDAO.getSetting();
    return res.status(200).json(setting);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports.updateSetting = async function (req, res) {
  try {
    const newSetting = await SettingDAO.updateSetting(req.body);
    return res.status(200).json(newSetting);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
