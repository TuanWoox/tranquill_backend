const BaseHandler = require("../baseHandler");
const OTP = require("../../../models/OTP");
const sendMail = require("../../../nodemailer/sendMail");

class CreateOTPHandler extends BaseHandler {
  async execute(req, res) {
    const { email } = req.body;

    try {
      const otp = await OTP.generateOTP(email);
      await sendMail(email, otp);

      return { message: "OTP has been sent successfully!" };
    } catch (err) {
      if (err.message === "EXISTING_VALID_OTP") {
        throw {
          status: 400,
          message:
            "You already have an OTP. Please check your email or wait for the code to expire.",
        };
      }

      console.error("Error creating OTP:", err);
      throw { status: 500, message: "Server error, please try again." };
    }
  }
}

module.exports = CreateOTPHandler;
