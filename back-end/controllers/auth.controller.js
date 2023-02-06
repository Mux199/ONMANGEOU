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
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
  "7.jpg",
  "8.jpg",
  "9.jpg",
  "10.jpg",
  "11.jpg",
  "12.jpg",
  "13.jpg",
  "14.jpg",
  "15.jpg",
  "16.jpg",
  "17.jpg",
  "18.jpg",
  "19.jpg",
  "20.jpg",
  "21.jpg",
  "22.jpg",
  "23.jpg",
  "24.jpg",
  "25.jpg",
  "26.jpg",
  "27.jpg",
  "28.jpg",
  "29.jpg",
  "30.jpg",
];
const randomBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
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
      let img2 = img[randomBetween(0, 30)];
      let city2 = city.toLowerCase();
      await RestaurantModel.create({
        user,
        name,
        adresse,
        siret,
        city: city2,
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
        img: img2,
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
