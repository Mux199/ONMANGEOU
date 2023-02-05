const UserModel = require("../models/user.model");
const RestaurantModel = require("../models/restaurant.model");
const jwt = require("jsonwebtoken");
const { signUpErrors, signInErrors } = require("../utils/errors.utils");

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
    name,
    role,
    adresse,
    siret,
    city,
    postalCode,
    type,
    waiting,
    priceRange,
    places,
    nbplaces,
    description,
    cols,
    rows,
    telephoneRestaurant,
  } = req.body;

  console.log(role);
  try {
    // create user
    const user = await UserModel.create({
      email,
      password,
      firstname,
      lastname,
      telephone,
      role,
    });
    //create professional if role
    if (role == "professional") {
      const restaurant = await RestaurantModel.create({
        user,
        name,
        adresse,
        siret,
        city,
        type,
        name,
        waiting,
        priceRange,
        places,
        nbplaces,
        description,
        postalCode,
        cols,
        rows,
        telephone: telephoneRestaurant,
      });
    }
    res.status(201).json({ user: user.email, role: user.role });
  } catch (err) {
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
    res.status(200).json({ _id: user._id, role: user.role });
  } catch (err) {
    const errors = signInErrors(err);
    res.status(200).json({ errors });
  }
};

module.exports.logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
