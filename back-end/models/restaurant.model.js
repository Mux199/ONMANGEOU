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
    type: String,
    minlength: 10,
    maxlength: 15,
    trim: true,
    match: /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
  },
  siret: {
    type: String,
    maxlength: 14,
    minlength: 14,
    required: true,
    trim: true,
    match: /^\d{14}$/,
  },
  city: {
    type: String,
    required: true,
    maxlength: 40,
    minlength: 2,
    trim: false,
  },
  postalCode: {
    type: String,
    required: true,
    maxlength: 5,
    minlength: 5,
    match: /^\d{5}$/,
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
  nbplaces: {
    type: Number,
    required: true,
    min: 1,
    max: 400,
  },
  places: {
    type: Array,
    required: true,
  },
  description: {
    type: String,
    required: true,
    maxlength: 250,
    minlength: 5,
  },
  type: {
    type: String,
    required: true,
    maxlength: 40,
    minlength: 2,
    enum: [
      "japonais",
      "français",
      "americain",
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
  cols: {
    type: Number,
    required: true,
  },
  rows: {
    type: Number,
    required: true,
  },
});

restaurantSchema.plugin(uniqueValidator);

const RestaurantModel = mongoose.model("restaurant", restaurantSchema);
module.exports = RestaurantModel;
