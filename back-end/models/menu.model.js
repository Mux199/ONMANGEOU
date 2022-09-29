const mongoose = require("moongoose");

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

const MenuModel = mongoose.model("menu", menuSchema);
module.exports = MenuModel;
