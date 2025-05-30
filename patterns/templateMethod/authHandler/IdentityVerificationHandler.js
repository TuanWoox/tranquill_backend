const BaseHandler = require("../baseHandler");
const UserDAO = require("../../../DAO/UserDAO");

class IdentityVerificationHandler extends BaseHandler {
  async execute(req, res) {
    const { email } = req.body;
    if (!email) throw { status: 400, message: "Missing required information" };

    const user = await UserDAO.findByEmail(email);
    if (user) return { message: "Identity verification successful" };
    throw { status: 404, message: "User not found" };
  }
}

module.exports = IdentityVerificationHandler;
