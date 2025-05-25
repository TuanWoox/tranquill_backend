const BaseHandler = require("../baseHandler");
const UserDAO = require("../../../DAO/UserDAO");

class ResetPasswordHandler extends BaseHandler {
  async execute(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      throw { status: 400, message: "Thiếu thông tin cần thiết" };
    }

    const foundUser = await UserDAO.findByEmail(email);
    if (!foundUser) {
      throw { status: 401, message: "Tài khoản không tồn tại" };
    }

    await foundUser.changePassword(password);
    return { message: "Đặt lại mật khẩu thành công" };
  }
}

module.exports = ResetPasswordHandler;
