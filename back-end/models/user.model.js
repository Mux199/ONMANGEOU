const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
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
      enum: ["user", "professional", "admin"],
    },
    blocked: {
      type: Boolean,
      default: false,
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "restaurant",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;
