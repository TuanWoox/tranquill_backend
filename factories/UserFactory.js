const User = require("../models/user");
require("dotenv").config();
const bcrypt = require("bcrypt");

class UserFactory {
  static async createUser(data) {
    const hashedPassword = await bcrypt.hash(
      data.password,
      Number(process.env.ROUND)
    );

    const user = new User({
      fullName: data.fullName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      nationalId: data.nationalId,
      dateOfBirth: data.dateOfBirth,
      password: hashedPassword,
      role: data.role || "user", // <-- respect passed role
    });

    return user;
  }

  static async createAdmin(data) {
    return this.createUser({
      ...data,
      role: "admin",
    });
  }
}

module.exports = UserFactory;
