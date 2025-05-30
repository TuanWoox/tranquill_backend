const BaseHandler = require("../baseHandler");
const UserDAO = require("../../../DAO/UserDAO");

class ResetPasswordHandler extends BaseHandler {
  async execute(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      throw { status: 400, message: "Missing required information" };
    }

    const foundUser = await UserDAO.findByEmail(email);
    if (!foundUser) {
      throw { status: 401, message: "Account does not exist" };
    }

    await foundUser.changePassword(password);
    return { message: "Reset password successfully" };
  }
}

module.exports = ResetPasswordHandler;
