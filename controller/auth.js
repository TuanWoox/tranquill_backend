const UserDAO = require("../DAO/UserDAO");
const UserPrototype = require("../patterns/prototype/userPrototype");
const { generateAccessToken } = require("../utils/utils");
module.exports.signUp = async (req, res) => {
  try {
    // Using UserPrototype to clone and customize user object
    const clonedUser = await UserPrototype.clone(
      req.body.fullName,
      req.body.email,
      req.body.password,
      req.body.dateOfBirth,
      req.body.phoneNumber,
      req.body.nationalId,
      req.body.role || "user" // Default to 'user' if no role is provided
    );

    // Save the new user to the database

    const savedUser = await UserDAO.save(clonedUser);

    return res.status(201).json({ message: "Tạo tài khoản thành công" });
  } catch (err) {
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
        fullName: foundUser.fullName,
        role: foundUser.role,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
const jwt = require("jsonwebtoken");

module.exports.identityVerification = async (req, res) => {
  const { email } = req.body;
  if (!email)
    return res.status(400).json({ message: "Thiếu thông tin cần thiết" });

  try {
    const user = await UserDAO.findByEmail(email);
    
    if (user) return res.status(200).json({ message: "Xác thực thành công" });
    return res.status(404).json({ message: "Không tìm thấy người dùng" });
  } catch {
    return res.status(500).json({ message: "Lỗi máy chủ nội bộ" });
  }
};

module.exports.validateJWT = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token missing or malformed" });
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const foundUser = await UserDAO.findById(decoded.id);

    return res.status(200).json({
      message: "Token is valid",
      user: {
        id: foundUser._id,
        email: foundUser.email,
        fullName: foundUser.fullName,
        role: foundUser.role,
      },
    });
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
