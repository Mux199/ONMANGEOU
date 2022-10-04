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
  try {
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          telephone: req.body.telephone,
        },
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
        context: "query",
      }
    )
      .select("-password")
      .then((docs) => res.status(200).send(docs))
      .catch((err) => res.status(500).send({ message: err }));
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

module.exports.deleteUser = async (req, res) => {
  try {
    await UserModel.remove({ _id: req.params.id }).exec();
    res.status(200).json({ message: "successfully deleted. " });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};
