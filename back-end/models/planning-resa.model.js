const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const planningResaSchema = new mongoose.Schema({
  places: {
    type: Number,
    required: true,
    min: 0,
    max: 16,
  },
  reservation: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "reservation",
  },
  emplacement: {
    validate: [arrayLimit, "{PATH} exceeds the limit of 10"],
  },
});

planningSchema.plugin(uniqueValidator);

function arrayLimit(val) {
  return val.length <= 2;
}

const PlanningModel = mongoose.model("planning", planningSchema);
module.exports = PlanningModel;
