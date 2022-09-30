const mongoose = require("mongoose");
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    validate: [isEmail],
    lowercase: true,
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1024, // 1024 car cryptage, verification taille max : 20 char en front
    minlength: 6,
  },
  firstname: {
    type: String,
    required: true,
    maxlength: 30,
    minlength: 2,
    trim: true,
  },
  lastname: {
    type: String,
    required: true,
    maxlength: 30,
    minlength: 2,
    trim: true,
  },
  telephone: {
    type: Number,
    maxlength: 15,
    minlength: 10,
  },
  role: {
    type: String,
    required: true,
    enum: ["user", "professionnal", "admin"],
  },
  blocked: {
    type: Boolean,
    default: false,
  },
});

const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;
