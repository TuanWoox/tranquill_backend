const BaseHandler = require("../baseHandler");
const UserDAO = require("../../../DAO/UserDAO");
const { updateUserSchema } = require("../../../joi/validateSchema");

class UpdateProfileHandler extends BaseHandler {
  async execute(req, res) {
    const { id } = req.user;
    const { error, value } = updateUserSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const err = new Error(error.details.map((d) => d.message).join(", "));
      err.status = 400;
      throw err;
    }

    const updatedUser = await UserDAO.findByIdAndUpdate(id, value);

    if (!updatedUser) {
      const err = new Error("User not found");
      err.status = 404;
      throw err;
    }

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
