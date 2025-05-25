const BaseHandler = require("../baseHandler");
const UserDAO = require("../../../DAO/UserDAO");
const UserPrototype = require("../../prototype/userPrototype");

class SignUpHandler extends BaseHandler {
  async execute(req, res) {
    const clonedUser = await UserPrototype.clone(
      req.body.fullName,
      req.body.email,
      req.body.password,
      req.body.dateOfBirth,
      req.body.phoneNumber,
      req.body.nationalId,
      req.body.role || "user"
    );

    await UserDAO.save(clonedUser);
    return { message: "Tạo tài khoản thành công" };
  }
}

module.exports = SignUpHandler;
