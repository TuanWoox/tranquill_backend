const User = require("../models/user");

class UserDAO {
  async save(user) {
    try {
      return await user.save();
    } catch (err) {
      if (err.code === 11000) {
        // Handle duplicate key errors (e.g., email already exists)
        throw new Error("A user with this email already exists");
      }
      throw err;
    }
  }

  async findByEmail(email) {
    try {
      return await User.findOne({ email });
    } catch (err) {
      throw err;
    }
  }
  async findById(id) {
    try {
      return await User.findById(id);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = new UserDAO();
