const RestaurantModel = require("../models/restaurant.model");

module.exports.getAllRestaurants = async (req, res) => {
  const restaurant = await RestaurantModel.find();
  res.status(200).json(restaurant);
};

module.exports.restaurantInfo = (req, res) => {
  console.log(req.params);
  RestaurantModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else return res.status(400).send("restaurant unknown : " + req.params.id);
  });
};

module.exports.updateRestaurant = async (req, res) => {
  RestaurantModel.updateOne(
    { _id: req.body.id },
    { $set: req.body },
    (err, docs) => {
      if (!err) return res.send(docs);
      if (err) return res.status(400).send({ message: err });
    }
  );
};

module.exports.addRestaurant = async (req, res) => {
  RestaurantModel.create({
    
  });
};
