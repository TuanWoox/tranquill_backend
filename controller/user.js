const UserDAO = require("../DAO/UserDAO");

module.exports.getInformation = async function (req, res) {
  const { id } = req.user;
  try {
    const foundUser = await UserDAO.findById(id);

    res.status(200).json(foundUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports.updateProfile = async function (req, res) {
  const { id } = req.user;

  try {
    const updatedUser = await UserDAO.findByIdAndUpdate(id, req.body);
    res.status(200).json({
      user: {
        id: updatedUser._id,
        email: updatedUser.email,
        fullName: updatedUser.fullName,
        role: updatedUser.role,
      },
      updatedUser,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
