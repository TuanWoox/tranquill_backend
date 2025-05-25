const UserHandler = require("../patterns/templateMethod/userHandler/index");

module.exports.getInformation = async function (req, res) {
  UserHandler.getInformationHandler.handle(req, res);
};
module.exports.updateProfile = async function (req, res) {
  UserHandler.updateProfileHandler.handle(req, res);
};

module.exports.resetPassword = async function (req, res) {
  UserHandler.resetPasswordHandler.handle(req, res);
};

module.exports.changePassword = async function (req, res) {
  UserHandler.changePasswordHandler.handle(req, res);
};
