const BaseHandler = require("../baseHandler");
const UserDAO = require("../../../DAO/SettingDAO");
const jwt = require("jsonwebtoken");

class ValidateJWTHandler extends BaseHandler {
  async execute(req, res) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw { status: 401, message: "Token missing or malformed" };
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const foundUser = await UserDAO.findById(decoded.id);

    return {
      message: "Token is valid",
      user: {
        id: foundUser._id,
        email: foundUser.email,
        fullName: foundUser.fullName,
        role: foundUser.role,
      },
    };
  }
}

module.exports = ValidateJWTHandler;
