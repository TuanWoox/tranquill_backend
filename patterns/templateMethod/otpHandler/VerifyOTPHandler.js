const BaseHandler = require("../baseHandler");
const OTPDAO = require("../../../DAO/OTPDAO");
const { generateOTPToken } = require("../../../utils/utils");
const COOKIE_OPTIONS = require("../../../config/cookieOption");

class VerifyOTPHandler extends BaseHandler {
  async execute(req, res) {
    const { otp } = req.query;

    const foundOTP = await OTPDAO.findByOtp(otp);
    if (!foundOTP) {
      throw { status: 400, message: "Invalid OTP code." };
    }

    if (foundOTP.isExpired()) {
      throw { status: 400, message: "OTP code has expired." };
    }

    const newOTPToken = generateOTPToken(foundOTP.email);
    await OTPDAO.deleteOTPByEmail(foundOTP.email);
    res.cookie("OTPToken", newOTPToken, COOKIE_OPTIONS.otp);

    return { message: "OTP verification successful!" };
  }
}

module.exports = VerifyOTPHandler;
