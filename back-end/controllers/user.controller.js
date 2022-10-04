const UserModel = require("../models/user.model");

module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select("-password");
  res.status(200).json(users);
};

module.exports.userInfo = (req, res) => {
  console.log(req.params);
  UserModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else return res.status(400).send("id unknown : " + req.params.id);
  }).select("-password");
};

module.exports.updateUser = (req, res) => {
  const block = req.body.blocked;
  console.log(req.body.blocked);
  UserModel.updateOne(
    { _id: req.params.id },
    {
      $set: {
        blocked: block,
      },
    },
    (err, docs) => {
      if (!err) return res.send(docs);
      if (err) return res.status(500).send({ message: err });
    }
  );
};
