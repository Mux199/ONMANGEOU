const UserModel = require("../models/user.model");

module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select("-password");
  return res.status(200).json(users);
};

module.exports.userInfo = (req, res) => {
  console.log(req.params);
  UserModel.findById(req.params.id, (err, docs) => {
    if (!err) res.status(200).send(docs);
    else return res.status(404).send("id unknown : " + req.params.id);
  }).select("-password");
};

module.exports.updateUser = async (req, res) => {
  await UserModel.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        telephone: req.body.telephone,
      },
    },
    { upsert: true, runValidators: true, context: "query" }
  )
    .then((res) => res.status(200))
    .catch((err) => res.status(500).send({ message: err }));
};
