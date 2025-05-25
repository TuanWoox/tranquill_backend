const OTPHandler = require("../patterns/templateMethod/otpHandler/index");

module.exports.createOTP = async (req, res) => {
  OTPHandler.createOTPHandler.handle(req, res);
};

module.exports.verifyOTP = async (req, res) => {
  OTPHandler.verifyOTPHandler.handle(req, res);
};
