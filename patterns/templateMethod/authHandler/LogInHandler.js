const BaseHandler = require("../baseHandler");
const UserDAO = require("../../../DAO/UserDAO");
const { generateAccessToken } = require("../../../utils/utils");

class LogInHandler extends BaseHandler {
  async execute(req, res) {
    const foundUser = await UserDAO.findByEmail(req.body.email);
    if (!foundUser || !(await foundUser.verifyPassword(req.body.password))) {
      throw { status: 401, message: "Incorrect login information" };
    }

    const token = generateAccessToken(foundUser);
    return {
      message: "Login successful",
      token,
      user: {
        id: foundUser._id,
        email: foundUser.email,
        fullName: foundUser.fullName,
        role: foundUser.role,
      },
    };
  }
}

module.exports = LogInHandler;
