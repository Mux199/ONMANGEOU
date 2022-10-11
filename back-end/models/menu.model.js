const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const menuSchema = new mongoose.Schema({
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "restaurant",
    required: true,
  },
  menu: {
    type: Array,
    required: true,
  },
});

menuSchema.plugin(uniqueValidator);

const MenuModel = mongoose.model("menu", menuSchema);
module.exports = MenuModel;
