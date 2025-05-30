const BaseHandler = require("../baseHandler");
const UserDAO = require("../../../DAO/UserDAO");
const bcrypt = require("bcrypt");

class ChangePasswordHandler extends BaseHandler {
  async execute(req, res) {
    const { id } = req.user;
    const { oldPassword, newPassword } = req.body;

    const user = await UserDAO.findById(id);
    if (!user) {
      throw { status: 404, message: "The account does not exist" };
    }

    const isMatch = await user.verifyPassword(oldPassword);
    if (!isMatch) {
      throw { status: 400, message: "Password does not match" };
    }

    await user.changePassword(newPassword);
    return { message: "Changed password successfully" };
  }
}

module.exports = ChangePasswordHandler;
