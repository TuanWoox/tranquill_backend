const BaseHandler = require("../baseHandler");
const UserDAO = require("../../../DAO/UserDAO");
const { generateAccessToken } = require("../../../utils/utils");

class LogInHandler extends BaseHandler {
  async execute(req, res) {
    const foundUser = await UserDAO.findByEmail(req.body.email);
    if (!foundUser || !(await foundUser.logIn(req.body.password))) {
      throw { status: 401, message: "Thông tin đăng nhập không chính xác" };
    }

    const token = generateAccessToken(foundUser);
    return {
      message: "Đăng nhập thành công",
      token,
      user: {
        id: foundUser._id,
        email: foundUser.email,
        fullName: foundUser.fullName,
        role: foundUser.role,
      },
    };
  }
}

module.exports = LogInHandler;
