require("dotenv").config();
const OTP = require("./models/OTP");
const sendMail = require("./nodemailer/sendMail");
const connectDB = require("./config/dbconnect");
connectDB();

async function test() {
  const email = "bopiranha@gmail.com"; // Email test của bạn

  try {
    // Tạo OTP
    const otp = await OTP.generateOTP(email);
    console.log("OTP vừa tạo:", otp);

    // Gửi mail
    await sendMail(email, otp);
    console.log("Đã gửi email thành công!");
  } catch (err) {
    console.error("Lỗi khi test OTP:", err);
  }
}

test();