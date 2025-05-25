const CreateOTPHandler = require("./CreateOTPHandler");
const VerifyOTPHandler = require("./VerifyOTPHandler");

module.exports = {
  createOTPHandler: new CreateOTPHandler(),
  verifyOTPHandler: new VerifyOTPHandler(),
};
