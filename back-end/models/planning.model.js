const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const planningSchema = new mongoose.Schema({
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "restaurant",
    required: true,
  },
  date: {
    type: Date,
  },
  hours: {
    type: String,
    maxlength: 20,
    minlength: 2,
    enum: [
      "12H00",
      "13H00",
      "14H00",
      "18H00",
      "19H00",
      "20H00",
      "21H00",
      "22H00",
    ],
  },
  places: {
    type: Array,
    required: true,
  },
});

planningSchema.plugin(uniqueValidator);

const PlanningModel = mongoose.model("planning", planningSchema);
module.exports = PlanningModel;
