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

let img = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30,
];
const getRandomValue = (arr) => arr[Math.floor(Math.random() * arr.length)];

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
    weekdays,
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
      let img = getRandomValue().toString() + ".jpg";
      const restaurant = await RestaurantModel.create({
        user,
        name,
        adresse,
        siret,
        city,
        type,
        name,
        waiting,
        weekdays,
        priceRange,
        places,
        nbplaces,
        description,
        postalCode,
        cols,
        img,
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
