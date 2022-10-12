const ReservationModel = require("../models/restaurant.model");
const PlanningModel = require("../models/planning.model");
const RestaurantModel = require("../models/restaurant.model");

module.exports.addReservation = (req, res) => {
  console.log(req.params);
  // resa on cherche si on a une resa le même jour au même temps ( soit midi, soit soir )
  // et on refuse sinon
  // on cherche soit l'utilisateur choisit sa place soit il laisse choisir
  // on ajoute dans reservation
  ReservationModel.find(req.params.id, (err, docs) => {
    if (!err) res.status(200).send(docs);
    else return res.status(404).send("id unknown : " + req.params.id);
  });
};
