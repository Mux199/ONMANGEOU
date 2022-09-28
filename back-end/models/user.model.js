const mongoose = requite("moongoose");
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
    maxlength: 1024, // 1024 car cryptage, verification taille max : 20 char en front
    minlength: 6,
    trim: true,
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
});
