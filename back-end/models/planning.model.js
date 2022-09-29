const mongoose = require("moongoose");

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
  },
  places: {
    type: Array,
    required: true,
  },
});

const PlanningModel = mongoose.model("planning", planningSchema);
module.exports = PlanningModel;
