const UserDAO = require("../DAO/UserDAO");

module.exports.getInformation = async function (req, res) {
  const { id } = req.user;
  try {
    const foundUser = await UserDAO.findById(id);

    res.status(200).json({ foundUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
