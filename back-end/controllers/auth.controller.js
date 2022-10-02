const UserModel = require("../models/user.model");
const RestaurantModel = require("../models/restaurant.model");
module.exports.signUp = async (req, res) => {
  const {
    email,
    password,
    firstname,
    lastname,
    telephone,
    professional,
    RestaurantName,
    adresse,
    siret,
    city,
    postalCode,
    type,
    waitingTime,
    place,
    description,
    restaurantTelephone,
  } = req.body;

  console.log(req.body);

  try {
    // create user
    const user = await UserModel.create({
      email,
      password,
      firstname,
      lastname,
      telephone,
      role: professional ? "professional" : "user",
    });
    res.status(201).json({ user: user.email, role: user.role });
    // create professional if exist
    // if (professional) {
    //   // const restaurant = await RestaurantModel.create({email, password, firstName, lastName, telephone, role: 'user'});
    // }
  } catch (err) {
    res.status(200).send({ err });
  }
};
