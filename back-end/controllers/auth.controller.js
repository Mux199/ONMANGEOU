const UserModel = require("../models/user.model");
const RestaurantModel = require("../models/restaurant.model");
const jwt = require("jsonwebtoken");
const { signUpUserErrors, signInErrors } = require("../utils/errors.utils");

const maxAge = 3 * 24 * 24 * 60 * 1000; // 1 day
const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

module.exports.signUpUser = async (req, res) => {
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
    waiting,
    priceRange,
    places,
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
    //create professional if exist
    if (professional) {
      const restaurant = await RestaurantModel.create({
        user: user,
        name: RestaurantName,
        adresse,
        telephone,
        siret,
        city,
        type,
        waiting,
        priceRange,
        places,
        description,
        postalCode,
        telephone: restaurantTelephone,
      });
    }
    console.log(res);
    res.status(201).json({ user: user.email, role: user.role });
  } catch (err) {
    console.log(err);
    const errors = signUpErrors(err);
    res.status(200).json({ errors });
  }
};

module.exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.login(email, password);
    if (user.blocked) {
      return res
        .status(401)
        .send({ message: "user is blocked contact info@lafourchette.com" });
    }
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge });
    res.status(200).json({ user: user._id, role: user.role });
  } catch (err) {
    const errors = signInErrors(err);
    res.status(200).json({ errors });
  }
};

module.exports.logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.status(302).redirect("/");
};
