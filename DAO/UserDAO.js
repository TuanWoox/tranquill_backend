const User = require("../models/user");

class UserDAO {
  constructor() {
    // Ensure this constructor is only used once
    if (UserDAO.instance) {
      return UserDAO.instance;
    }

    UserDAO.instance = this;
  }

  async save(user) {
    try {
      const savedUser = new User(user);
      return await savedUser.save();
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

  async findByIdAndUpdate(id, updatedData) {
    try {
      return await User.findByIdAndUpdate(id, updatedData, {
        new: true,
        runValidators: true,
      });
    } catch (err) {
      throw err;
    }
  }
}

// Create and freeze the singleton instance
const instance = new UserDAO();
Object.freeze(instance);

// Export the singleton instance
module.exports = instance;
