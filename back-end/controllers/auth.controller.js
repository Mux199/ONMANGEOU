const UserModel = require("../models/user.model");
const RestaurantModel = require("../models/restaurant.model");
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 24 * 60 * 1000; // 1 day
const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

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

module.exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge });
    res.status(200).json({ user: user._id, role: user.role });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.status(302).redirect("/");
};
