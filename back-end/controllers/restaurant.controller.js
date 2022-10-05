const RestaurantModel = require("../models/restaurant.model");

module.exports.getAllRestaurant = async (req, res) => {
  const restaurants = await RestaurantModel.find();
  return res.status(200).json(restaurants);
};

module.exports.restaurantInfo = (req, res) => {
  console.log(req.params);
  RestaurantModel.findById(req.params.id, (err, docs) => {
    if (!err) res.status(200).send(docs);
    else return res.status(404).send("id unknown : " + req.params.id);
  });
};

module.exports.blockRestaurant = async (req, res) => {
  try {
    await RestaurantModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          blocked: req.body.blocked,
        },
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
        context: "query",
      }
    )
      .then((docs) =>
        res.status(200).send({ message: "user block : " + req.body.blocked })
      )
      .catch((err) => res.status(500).send({ message: err }));
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};
