const nodemailer = require("nodemailer");

// Tạo transporter dùng Gmail SMTP
const transporter = nodemailer.createTransport({
  secure: true,
  host: "smtp.gmail.com",
  auth: {
    user: process.env.NODEMAILER_ACCOUNT,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

/**
 * Gửi email OTP reset password cho khách hàng
 * @param {string} to - Email người nhận
 * @param {string} otp - Mã OTP
 */
async function sendMail(to, otp) {
  const subject = "Đặt lại mật khẩu - Cabin Booking";
  const html = `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f7fc;
            color: #333;
            padding: 20px;
          }
          .container {
            background-color: #ffffff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            max-width: 600px;
            margin: 0 auto;
          }
          h2 {
            color: #2c3e50;
            text-align: center;
          }
          .otp {
            background-color: #3498db;
            color: white;
            font-size: 24px;
            font-weight: bold;
            padding: 10px 20px;
            border-radius: 4px;
            display: inline-block;
            margin-top: 15px;
          }
          .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 14px;
            color: #888;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Đặt Lại Mật Khẩu Cabin Booking</h2>
          <p>Chào bạn,</p>
          <p>Bạn vừa yêu cầu đặt lại mật khẩu cho tài khoản Cabin Booking. Vui lòng sử dụng mã OTP dưới đây để xác thực:</p>
          <h3 class="otp">${otp}</h3>
          <p><strong>Mã OTP có hiệu lực trong vòng 2 phút.</strong></p>
          <p>Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email này.</p>
          <div class="footer">
            <p>Trân trọng,</p>
            <p><strong>Cabin Booking</strong></p>
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      to,
      subject,
      html,
    });
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

module.exports = sendMail;