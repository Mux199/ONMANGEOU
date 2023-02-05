const PlanningModel = require("../models/planning.model");

// get planning
module.exports.getPlanning = (req, res) => {
  PlanningModel.find({ restaurant: req.params.id }, (err, docs) => {
    if (!err) {
      if (docs.length > 0) {
        res.status(200).send(docs);
      } else {
        res.status(404).send({ message: "planning not found" });
      }
    } else {
      return res.status(400).send(err);
    }
  });
};
