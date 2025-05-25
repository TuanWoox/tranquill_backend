const BaseHandler = require("../baseHandler");
const OTP = require("../../../models/OTP");
const sendMail = require("../../../nodemailer/sendMail");

class CreateOTPHandler extends BaseHandler {
  async execute(req, res) {
    const { email } = req.body;

    try {
      const otp = await OTP.generateOTP(email);
      await sendMail(email, otp);

      return { message: "OTP đã được gửi thành công!" };
    } catch (err) {
      if (err.message === "EXISTING_VALID_OTP") {
        throw {
          status: 400,
          message:
            "Bạn đã có mã OTP, xin vui lòng kiểm tra email hoặc đợi mã hết hạn.",
        };
      }

      console.error("Error creating OTP:", err);
      throw { status: 500, message: "Lỗi máy chủ, vui lòng thử lại." };
    }
  }
}

module.exports = CreateOTPHandler;
