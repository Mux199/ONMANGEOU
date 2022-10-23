const PlanningModel = require("../models/planning.model");
const RestaurantModel = require("../models/restaurant.model");

module.exports.getAllPlanning = (req, res) => {
  ReservationModel.find(req.params.id, (err, docs) => {
    if (!err) {
      res.status(200).send(docs);
    } else {
      return res.status(404).send("id unknown : " + req.params.id);
    }
  });
};

module.exports.getPlanning = (req, res) => {
  ReservationModel.find(req.params.id, (err, docs) => {
    if (!err) {
      res.status(200).send(docs);
    } else {
      return res.status(404).send("id unknown : " + req.params.id);
    }
  });
};

// and refresh page if not available
module.exports.addPlanning = (req, res) => {
  const { restaurant, user, location, places, date, hour } = req.body;

  ReservationModel.find(req.params.id, (err, docs) => {
    if (!err) {
      res.status(200).send(docs);
    } else {
      return res.status(404).send("id unknown : " + req.params.id);
    }
  });
};

module.exports.searchAndAddPlanning = (req, res) => {
  ReservationModel.find(req.params.id, (err, docs) => {
    if (!err) {
      res.status(200).send(docs);
    } else {
      return res.status(404).send("id unknown : " + req.params.id);
    }
  });
};

module.exports.deletePlanning = (req, res) => {
  ReservationModel.find(req.params.id, (err, docs) => {
    if (!err) {
      res.status(200).send(docs);
    } else {
      return res.status(404).send("id unknown : " + req.params.id);
    }
  });
};

module.exports.updatePlanning = (req, res) => {
  ReservationModel.find(req.params.id, (err, docs) => {
    if (!err) {
      res.status(200).send(docs);
    } else {
      return res.status(404).send("id unknown : " + req.params.id);
    }
  });
};
