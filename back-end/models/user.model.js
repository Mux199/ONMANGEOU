const mongoose = require("mongoose");
const { isEmail } = require("validator");
var uniqueValidator = require("mongoose-unique-validator");
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
      maxlength: 1024, // 1024 car chiffrement, verification taille max : 20 char en front
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
      type: String,
      minlength: 10,
      maxlength: 15,
      trim: true,
      match: /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
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
    loginAttempt: {
      type: Number,
      min: 0,
      max: 5,
      default: 5,
    },
  },
  { timestamps: true }
);
userSchema.plugin(uniqueValidator);

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("password is incorrect");
  }
  throw Error("email is incorrect");
};

const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;
