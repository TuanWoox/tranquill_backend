const BaseHandler = require("../baseHandler");
const UserDAO = require("../../../DAO/UserDAO");

class IdentityVerificationHandler extends BaseHandler {
  async execute(req, res) {
    const { email } = req.body;
    if (!email) throw { status: 400, message: "Thiếu thông tin cần thiết" };

    const user = await UserDAO.findByEmail(email);
    if (user) return { message: "Xác thực thành công" };
    throw { status: 404, message: "Không tìm thấy người dùng" };
  }
}

module.exports = IdentityVerificationHandler;
