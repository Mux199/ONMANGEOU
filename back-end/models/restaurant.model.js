const mongoose = requite("moongoose");
const { isEmail } = require("validator");

const restaurantSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
    unique: true,
  },
  name: {
    type: String,
    trim: true,
    required: true,
    maxlength: 30,
    minlength: 2,
  },
  siret: {
    type: Number,
    maxlength: 14,
    minlength: 14,
    required: true,
  },
  telephone: {
    type: Number,
    maxlength: 15,
    minlength: 10,
  },
  adresse: {
    type: String,
    required: true,
    maxlength: 50,
    minlength: 2,
    trim: false,
  },
  city: {
    type: String,
    required: true,
    maxlength: 40,
    minlength: 2,
    trim: false,
  },
  postalCode: {
    type: Number,
    required: true,
    maxlength: 5,
    minlength: 5,
  },
  waiting: {
    type: String,
    required: true,
    maxlength: 40,
    minlength: 2,
  },
});

const RestaurantModel = mongoose.model("restaurant", userSchema);
module.exports = RestaurantModel;
