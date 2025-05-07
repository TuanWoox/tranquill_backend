const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    dateOfBirth: { type: Date, required: true },
    phoneNumber: { type: String, required: true },
    nationalId: { type: String, required: true },

    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      required: true,
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.logIn = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
