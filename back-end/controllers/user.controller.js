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

module.exports.updateUser = async (req, res) => {
  await UserModel.findById(req.params.id, (err) => {
    if (!err) {
      try {
        UserModel.findOneAndUpdate(
          { _id: req.params.id },
          {
            $set: {
              blocked: res.body.blocked,
            },
          },
          { new: true, upsert: true, setDefaultsOnInsert: true },
          (err, docs) => {
            if (!err) return res.send(docs);
            if (err) return res.status(500).send({ message: err + "pb" });
          }
        );
      } catch (err) {
        return res.status(500).send({ message: err });
      }
    } else return res.status(400).send("id unknown : " + req.params.id);
  })
    .clone()
    .catch(function (err) {
      console.log(err);
    });
};
