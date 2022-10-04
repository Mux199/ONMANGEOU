const UserModel = require("../models/user.model");

module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select("-password");
  res.status(200).json(users);
};

module.exports.userInfo = (req, res) => {
  console.log(req.params);
  UserModel.findById(req.params.id, (err, docs) => {
    if (!err) res.status(200);
    else return res.status(400).send("id unknown : " + req.params.id);
  }).select("-password");
};

module.exports.updateUser = async (req, res) => {
  UserModel.updateOne(
    { _id: req.params.id },
    {
      $set: {
        telephone: res.body.telephone,
      },
    },
    (err, docs) => {
      if (!err) return res.status(docs);
      if (err) return res.status(500).send({ message: err + "pb" });
    }
  );
};
