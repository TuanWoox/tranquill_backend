const BaseHandler = require("../baseHandler");
const UserDAO = require("../../../DAO/UserDAO");

class GetInformationHandler extends BaseHandler {
  async execute(req, res) {
    const { id } = req.user;
    const foundUser = await UserDAO.findById(id);
    return foundUser;
  }
}

module.exports = GetInformationHandler;
