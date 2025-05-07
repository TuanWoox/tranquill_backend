const UserDAO = require("../DAO/UserDAO");
const UserFactory = require("../factories/UserFactory");
const { generateAccessToken } = require("../utils/utils");

module.exports.signUp = async (req, res) => {
  try {
    // Consistent body access
    const newUser = await UserFactory.createUser(req.body);
    await UserDAO.save(newUser);

    return res.status(201).json({ message: "Tạo tài khoản thành công" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

module.exports.logIn = async (req, res) => {
  try {
    const foundUser = await UserDAO.findByEmail(req.body.email);
    if (!foundUser) {
      return res
        .status(401)
        .json({ message: "Thông tin đăng nhập không chính xác" });
    }

    const isMatch = await foundUser.logIn(req.body.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Thông tin đăng nhập không chính xác" });
    }
    const token = generateAccessToken(foundUser);
    return res.status(200).json({
      message: "Đăng nhập thành công",
      token,
      user: {
        id: foundUser._id,
        email: foundUser.email,
        name: foundUser.name,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};
const jwt = require("jsonwebtoken");

module.exports.validateJWT = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token missing or malformed" });
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return res.status(200).json({
      message: "Token is valid",
      user: decoded,
    });
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
