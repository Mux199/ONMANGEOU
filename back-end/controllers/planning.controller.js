const PlanningModel = require("../models/planning.model");
const RestaurantModel = require("../models/restaurant.model");
const UserModel = require("../models/user.model");

// get planning /

// and refresh page if not available
module.exports.addPlanning = async (req, res) => {
  const { restaurant, user, location, places, date, hours } = req.body;
  console.log("addPlanning");
  const restaurantPlaces = await RestaurantModel.findById(
    restaurant,
    "places"
  ).exec();
  const users = await UserModel.find().select("-password");

  try {
    place = initializePlanning;
    const planning = await PlanningModel.create({
      restaurant,
      user,
      location,
      places,
      date,
      hours,
    });
    console.log(res);
    res.status(201).json({ planning });
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
};

const initializePlanning = function (col, tableau) {
  let arr = tableau.map(function (element, index) {
    for (let i = 0; i < col; i++) {
      element[i] = { place: element[i], reserve: null, resa: null };
    }
    return [index, element];
  });
  var planning = new Map(el);
  return planning;
};

// fonction d'initialisation ou ajout d'element dans le planning

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

module.exports.getAllPlanning = (req, res) => {
  console.log(req.params);
  PlanningModel.findOne({ restaurant: req.params.id }, (err, docs) => {
    if (!err) {
      res.status(200).send(docs);
    } else {
      return res.status(404).send("id unknown : " + req.params.id);
    }
  });
};
