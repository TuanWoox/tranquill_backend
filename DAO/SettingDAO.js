const Setting = require("../models/setting");

class SettingDAO {
  async getSetting() {
    try {
      return Setting.findOne({});
    } catch (err) {
      throw err;
    }
  }
  async updateSetting(updatedSetting) {
    try {
      const updatedDoc = await Setting.findOneAndUpdate(
        {}, // Filter: assuming there's only one setting document
        { $set: updatedSetting }, // Update object
        { new: true } // Return the updated document
      );
      return updatedDoc;
    } catch (err) {
      throw err;
    }
  }
}

const instance = new SettingDAO();
Object.freeze(instance);
module.exports = instance;
