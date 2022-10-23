const ReservationModel = require("../models/reservation.model");
const PlanningModel = require("../models/planning.model");
const RestaurantModel = require("../models/restaurant.model");

module.exports.addReservation = (req, res) => {
  const { restaurant, user, location, places, date, hour } = req.body;

  console.log(req.params);
  // resa on cherche si on a une resa le même jour au même temps ( soit midi, soit soir )
  // et on refuse sinon
  // l'utilisateur choisit sa place
  // on ajoute dans reservation
  let dateFormat = new Date(date);
  let time;
  if (hour.inludes("12H00") || hour.inludes("13H00") || hour.inludes("14H00")) {
    time = "midi";
  } else {
    time = "soir";
  }
  ReservationModel.find(
    { user: user, date: dateFormat, restaurant: restaurant, time: time },
    (err, docs) => {
      if (!err) {
        return res
          .status(400)
          .send("Une reservation est déjà en cours le " + time);
      } else {
      }
    }
  );
};

module.exports.searchAndAddReservation = (req, res) => {
  // l'utilisateur laisse l'algothtme choisir sa place
  console.log(req.params);
  // resa on cherche si on a une resa le même jour au même temps ( soit midi, soit soir )
  // et on refuse sinon
  // on cherche soit l'utilisateur choisit sa place soit il laisse choisir
  // on ajoute dans reservation
  ReservationModel.find(req.params.id, (err, docs) => {
    if (!err) {
      res.status(200).send(docs);
    } else {
      return res.status(404).send("id unknown : " + req.params.id);
    }
  });
};

module.exports.getAllReservation = (req, res) => {
  console.log(req.params);
  // resa on cherche si on a une resa le même jour au même temps ( soit midi, soit soir )
  // et on refuse sinon
  // on cherche soit l'utilisateur choisit sa place soit il laisse choisir
  // on ajoute dans reservation
  ReservationModel.find(req.params.id, (err, docs) => {
    if (!err) {
      res.status(200).send(docs);
    } else {
      return res.status(404).send("id unknown : " + req.params.id);
    }
  });
};

module.exports.getReservation = (req, res) => {
  console.log(req.params);
  // resa on cherche si on a une resa le même jour au même temps ( soit midi, soit soir )
  // et on refuse sinon
  // on cherche soit l'utilisateur choisit sa place soit il laisse choisir
  // on ajoute dans reservation
  ReservationModel.find(req.params.id, (err, docs) => {
    if (!err) {
      res.status(200).send(docs);
    } else {
      return res.status(404).send("id unknown : " + req.params.id);
    }
  });
};

module.exports.updateReservation = (req, res) => {
  console.log(req.params);
  // resa on cherche si on a une resa le même jour au même temps ( soit midi, soit soir )
  // et on refuse sinon
  // on cherche soit l'utilisateur choisit sa place soit il laisse choisir
  // on ajoute dans reservation
  ReservationModel.find(req.params.id, (err, docs) => {
    if (!err) {
      res.status(200).send(docs);
    } else {
      return res.status(404).send("id unknown : " + req.params.id);
    }
  });
};
