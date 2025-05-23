const UserDAO = require("../DAO/UserDAO");
const bcrypt = require("bcrypt")

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

module.exports.resetPassword = async function (req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Thiếu thông tin cần thiết" });
  }
  try {
    const foundUser = await UserDAO.findByEmail(email);
    if (!foundUser) {
      return res.status(401).json({ message: "Tài khoản không tồn tại" });
    }
    await foundUser.changePassword(password);
    return res.status(200).json({ message: "Đặt lại mật khẩu thành công" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
}

module.exports.changePassword = async function (req, res) {
  const { id } = req.user;
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await UserDAO.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Tài khoản không tồn tại" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Mật khẩu hiện tại không đúng" });
    }

    await user.changePassword(newPassword);

    res.status(200).json({
      message: "Đổi mật khẩu thành công",
    });

  } catch (err) {
    console.error("Lỗi đổi mật khẩu:", err);  // <--- thêm dòng này để log lỗi thực tế
    res.status(500).json({ message: err.message });
  }
};

