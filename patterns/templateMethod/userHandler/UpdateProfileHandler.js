const BaseHandler = require("../baseHandler");
const UserDAO = require("../../../DAO/UserDAO");

class UpdateProfileHandler extends BaseHandler {
  async execute(req, res) {
    const { id } = req.user;
    const updatedUser = await UserDAO.findByIdAndUpdate(id, req.body);
    return {
      user: {
        id: updatedUser._id,
        email: updatedUser.email,
        fullName: updatedUser.fullName,
        role: updatedUser.role,
      },
      updatedUser,
    };
  }
}

module.exports = UpdateProfileHandler;
