const app = require("./server");
const request = require("supertest");
const assert = require("assert");
const ObjectId = require("mongodb").ObjectId;

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
