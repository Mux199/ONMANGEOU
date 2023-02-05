const MenuModel = require("../models/menu.model");
const RestaurantModel = require("../models/restaurant.model");

module.exports.getMenu = (req, res) => {
  MenuModel.find(req.params.id, (err, docs) => {
    if (!err) {
      res.status(200).send(docs);
    } else {
      return res.status(404).send("id unknown : " + req.params.id);
    }
  });
};

module.exports.addMenu = (req, res) => {
  MenuModel.find(req.params.id, (err, docs) => {
    if (!err) {
      res.status(200).send(docs);
    } else {
      return res.status(404).send("id unknown : " + req.params.id);
    }
  });
};

module.exports.updateMenu = (req, res) => {
  MenuModel.find(req.params.id, (err, docs) => {
    if (!err) {
      res.status(200).send(docs);
    } else {
      return res.status(404).send("id unknown : " + req.params.id);
    }
  });
};
