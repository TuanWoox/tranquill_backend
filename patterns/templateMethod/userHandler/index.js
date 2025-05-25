const ChangePasswordHandler = require("./ChangePasswordHandler");
const GetInformationHandler = require("./GetInformationHandler");
const ResetPasswordHandler = require("./ResetPasswordHandler");
const UpdateProfileHandler = require("./UpdateProfileHandler");

module.exports = {
  changePasswordHandler: new ChangePasswordHandler(),
  getInformationHandler: new GetInformationHandler(),
  resetPasswordHandler: new ResetPasswordHandler(),
  updateProfileHandler: new UpdateProfileHandler(),
};
