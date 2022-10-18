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

module.exports.blockUser = async (req, res) => {
  try {
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          blocked: req.body.blocked,
        },
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
        context: "query",
      }
    )
      .then((docs) =>
        res.status(200).send({ message: "user block : " + req.body.blocked })
      )
      .catch((err) => res.status(500).send({ message: err }));
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

module.exports.deleteUser = async (req, res) => {
  try {
    await UserModel.deleteOne({ _id: req.params.id }).exec();
    res.status(200).json({ message: "successfully deleted. " });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

module.exports.likeRestaurant = async (req, res) => {
  try {
    await UserModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          likes: req.body.idRestaurant,
        },
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
        context: "query",
      },
      (err, docs) => {
        if (!err) res.status(201).json(docs);
        else return res.status(400).json(err);
      }
    );
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

module.exports.unlikeRestaurant = async (req, res) => {
  try {
    await UserModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          likes: req.body.idRestaurant,
        },
      },
      (err, docs) => {
        if (!err) res.status(201).json(docs);
        else return res.status(400).json(err);
      }
    );
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

module.exports.blockUser = async (req, res) => {
  try {
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          blocked: req.body.blocked,
        },
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
        context: "query",
      }
    )
      .then((docs) =>
        res.status(200).send({ message: "user block : " + req.body.blocked })
      )
      .catch((err) => res.status(500).send({ message: err }));
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

module.exports.deleteUser = async (req, res) => {
  try {
    await UserModel.deleteOne({ _id: req.params.id }).exec();
    res.status(200).json({ message: "successfully deleted. " });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

module.exports.likeRestaurant = async (req, res) => {
  try {
    await UserModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          likes: req.body.idRestaurant,
        },
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
        context: "query",
      },
      (err, docs) => {
        if (!err) res.status(201).json(docs);
        else return res.status(400).json(err);
      }
    );
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

module.exports.unlikeRestaurant = async (req, res) => {
  try {
    await UserModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          likes: req.body.idRestaurant,
        },
      },
      (err, docs) => {
        if (!err) res.status(201).json(docs);
        else return res.status(400).json(err);
      }
    );
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};