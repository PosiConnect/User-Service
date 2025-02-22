const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter the name"],
  },

  email: {
    type: String,
    required: [true, "Please enter the email"],
    unique: true,
    index: true,
    validate: [validator.isEmail, "Please enter your email"],
  },
  password: {
    type: String,
    required: [true, "Please enter the password"],
    maxlength: [6, "password cannot exceed 6 letters"],
    select: false,
  },
  avatar: {
    type: String,
    default: "user",
  },
  role: {
    type: String,
    default: "admin",
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

userSchema.methods.isValidPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getResetToken = function () {
  //Generate Token
  const token = crypto.randomBytes(20).toString("hex");

  //Generate Hash and set to resetPasswordToken
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  //Set token expire time
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

  return token;
};

let model = mongoose.model("user", userSchema);

module.exports = model;
