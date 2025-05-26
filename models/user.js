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

userSchema.methods.verifyPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.changePassword = async function (newPassword) {
  const saltRounds = parseInt(process.env.ROUND) || 10;
  this.password = await bcrypt.hash(newPassword, saltRounds);
  await this.save();
};

module.exports = mongoose.model("User", userSchema);
