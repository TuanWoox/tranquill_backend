const BaseHandler = require("../baseHandler");
const UserDAO = require("../../../DAO/UserDAO");
const bcrypt = require("bcrypt");

class ChangePasswordHandler extends BaseHandler {
  async execute(req, res) {
    const { id } = req.user;
    const { oldPassword, newPassword } = req.body;

    const user = await UserDAO.findById(id);
    if (!user) {
      throw { status: 404, message: "Tài khoản không tồn tại" };
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      throw { status: 400, message: "Mật khẩu hiện tại không đúng" };
    }

    await user.changePassword(newPassword);
    return { message: "Đổi mật khẩu thành công" };
  }
}

module.exports = ChangePasswordHandler;
