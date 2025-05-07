const jwt = require("jsonwebtoken");

module.exports.generateAccessToken = function (user) {
  // Generate JWT token
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
  return token;
};
