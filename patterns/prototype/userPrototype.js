const User = require("./models/User"); // Import the User model

class UserPrototype {
  constructor() {
    // Default User values
    this.fullName = "John Doe";
    this.email = "johndoe@example.com";
    this.dateOfBirth = new Date("1990-01-01");
    this.phoneNumber = "123-456-7890";
    this.nationalId = "AB1234567";
    this.password = "password123"; // Default password (will be hashed later)
    this.role = "user"; // Default role
  }

  // Clone the prototype and modify specific fields
  async clone(
    newFullName,
    newEmail,
    newPassword,
    newDateOfBirth,
    newPhoneNumber,
    newNationalId,
    newRole = "user"
  ) {
    const clonedUser = Object.create(this);

    // Modify properties specific to the new user
    clonedUser.fullName = newFullName || this.fullName;
    clonedUser.email = newEmail || this.email;
    clonedUser.dateOfBirth = newDateOfBirth || this.dateOfBirth;
    clonedUser.phoneNumber = newPhoneNumber || this.phoneNumber;
    clonedUser.nationalId = newNationalId || this.nationalId;
    clonedUser.role = newRole || this.role;

    // Set the password and hash it before saving
    clonedUser.password = await bcrypt.hash(newPassword || this.password, 10);

    return clonedUser;
  }
}

module.exports = new UserPrototype(); // Export an instance of the prototype
