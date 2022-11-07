const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const restaurantSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  name: {
    type: String,
    trim: true,
    required: true,
    maxlength: 30,
    minlength: 2,
  },
  adresse: {
    type: String,
    trim: false,
    required: true,
    maxlength: 50,
    minlength: 5,
  },
  telephone: {
    type: Number,
    maxlength: 10,
    minlength: 10,
  },
  siret: {
    type: Number,
    maxlength: 14,
    minlength: 14,
    required: true,
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
    enum: ["rapide", "moyen", "long"],
  },
  priceRange: {
    type: String,
    required: true,
    maxlength: 40,
    minlength: 2,
    enum: ["pas cher", "moyen", "cher"],
  },
  places: {
    type: Array,
    required: true,
  },
  description: {
    type: String,
    required: true,
    maxlength: 200,
    minlength: 2,
  },
  type: {
    type: String,
    required: true,
    maxlength: 40,
    minlength: 2,
    enum: [
      "japonais",
      "français",
      "américain",
      "italien",
      "chinois",
      "indien",
      "ethiopien",
    ],
  },
  note: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
    default: 5,
  },
  col: {
    type: Number,
  },
  row: {
    type: Number,
  },
});

restaurantSchema.plugin(uniqueValidator);

const RestaurantModel = mongoose.model("restaurant", restaurantSchema);
module.exports = RestaurantModel;
