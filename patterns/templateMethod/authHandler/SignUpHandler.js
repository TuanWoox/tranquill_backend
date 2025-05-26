const BaseHandler = require("../baseHandler");
const UserDAO = require("../../../DAO/UserDAO");
const UserPrototype = require("../../prototype/userPrototype");
const { signUpSchema } = require("../../../joi/validateSchema");
class SignUpHandler extends BaseHandler {
  async execute(req, res) {
    // Validate input
    const { error, value } = signUpSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const err = new Error(error.details.map((d) => d.message).join(", "));
      err.status = 400;
      throw err;
    }

    // Check if email already exists
    const existingUser = await UserDAO.findByEmail(value.email);
    if (existingUser) {
      const err = new Error("Email đã được sử dụng."); // "Email already in use"
      err.status = 400;
      throw err;
    }

    // Proceed to create user
    const raw = UserPrototype.clone();
    const clonedUser = await UserPrototype.customize(raw, value);

    await UserDAO.save(clonedUser);

    return { message: "Tạo tài khoản thành công" };
  }
}

module.exports = SignUpHandler;
