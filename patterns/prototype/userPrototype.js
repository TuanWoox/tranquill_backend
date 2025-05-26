const bcrypt = require("bcrypt");

const defaultUser = {
  fullName: "John Doe",
  email: "johndoe@example.com",
  dateOfBirth: new Date("1990-01-01"),
  phoneNumber: "123-456-7890",
  nationalId: "AB1234567",
  password: "password123", // default password (hashed when cloning)
  role: "user",
};

class UserPrototype {
  constructor() {
    this.user = { ...defaultUser };
  }

  concreatePrototype(user) {
    this.user = user;
  }

  // Return a shallow clone of the default user
  clone() {
    return { ...this.user };
  }

  // Customize the cloned user and hash password
  async customize(
    clonedUser,
    {
      fullName,
      email,
      password,
      dateOfBirth,
      phoneNumber,
      nationalId,
      role = "user",
    }
  ) {
    clonedUser.fullName = fullName || clonedUser.fullName;
    clonedUser.email = email || clonedUser.email;
    clonedUser.dateOfBirth = dateOfBirth || clonedUser.dateOfBirth;
    clonedUser.phoneNumber = phoneNumber || clonedUser.phoneNumber;
    clonedUser.nationalId = nationalId || clonedUser.nationalId;
    clonedUser.role = role || clonedUser.role;

    // Hash the password, if provided; otherwise, hash existing password (default)
    const rawPassword = password || clonedUser.password;
    clonedUser.password = await bcrypt.hash(rawPassword, 10);

    return clonedUser;
  }
}

const userPrototype = new UserPrototype();
userPrototype.concreatePrototype(defaultUser);

module.exports = userPrototype;
