const jwt = require("jsonwebtoken");

module.exports.generateAccessToken = function (user) {
  // Generate JWT token
  const token = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
  return token;
};

module.exports.generateOTPToken = (email) => {
  const OTPToken = jwt.sign(
    {
      email: email,
    },
    process.env.JWT_OTP_SECRET_KEY,
    {
      expiresIn: "1m",
    }
  );
  return OTPToken;
};
