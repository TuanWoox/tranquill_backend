const BaseHandler = require("../baseHandler");
const UserDAO = require("../../../DAO/UserDAO");
const UserPrototype = require("../../prototype/userPrototype");

class SignUpHandler extends BaseHandler {
  async execute(req, res) {
    const raw = UserPrototype.clone();
    const clonedUser = await UserPrototype.customize(raw, {
      fullName: req.body.fullName,
      email: req.body.email,
      password: req.body.password,
      dateOfBirth: req.body.dateOfBirth,
      phoneNumber: req.body.phoneNumber,
      nationalId: req.body.nationalId,
      role: req.body.role || "user",
    });

    await UserDAO.save(clonedUser);
    return { message: "Tạo tài khoản thành công" };
  }
}

module.exports = SignUpHandler;
