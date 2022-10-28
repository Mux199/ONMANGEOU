const ReservationModel = require("../models/reservation.model");
const PlanningModel = require("../models/planning.model");
const RestaurantModel = require("../models/restaurant.model");

// user choose place
module.exports.addReservation = async (req, res) => {
  const { restaurant, user, nbClients, place, date, hour } = req.body;

  console.log(req.params);
  // resa on cherche si on a une resa le même jour au même temps ( soit midi, soit soir )
  // et on refuse sinon
  // l'utilisateur choisit sa place
  // on ajoute dans reservation
  let dateFormat = new Date(date);
  let time;
  if (
    hour.includes("12H00") ||
    hour.includes("13H00") ||
    hour.includes("14H00")
  ) {
    time = "midi";
  } else {
    time = "soir";
  }
  try {
    let resaUser = await ReservationModel.findOne({
      user: user,
      date: dateFormat,
      restaurant: restaurant,
      time: time,
    }).exec();
    if (!resaUser) {
      const planning = await PlanningModel.findOne({
        restaurant: restaurant,
        hours: hour,
        date: dateFormat,
      }).exec();
      console.log(planning);

      console.log("before");

      if (planning == null) {
        const restau = await RestaurantModel.findById({
          _id: restaurant,
        }).exec();
        console.log("restau");

        console.log(restau);
        const reservation = await ReservationModel.create({
          restaurant,
          user,
          date: dateFormat,
          hours: hour,
          time,
          nbClients,
          statut: "confirmer",
        });
        console.log("before initializePlanning : ");

        let places = initializePlanning(
          restau.col,
          restau.places,
          place,
          reservation.id,
          nbClients
        );
        console.log("initializePlanning dans add : ");
        console.log(places);

        const plann = await PlanningModel.create({
          restaurant,
          date: dateFormat,
          hours: hour,
          places,
        });
        console.log("plann");
        console.log(plann);
      } else {
        //planning.places
      }
    }

    //   (err, docs) => {
    //     console.log("docs");
    //     console.log(docs);
    //     console.log("err");
    //     console.log(err);
    //     if (err) {
    //       console.log("resa present already");
    //       return res
    //         .status(400)
    //         .send("Une reservation est déjà en cours le " + time);
    //     } else {
    //       const planning = PlanningModel.findOne({
    //         restaurant: restaurant,
    //         hours: hour,
    //         date: dateFormat,
    //       }).exec();
    //       if (planning.places == null) {
    //         const restau = RestaurantModel.findById({
    //           _id: restaurant,
    //         })
    //           .exec()
    //           .then((finalResult) => {
    //             console.log(finalResult);
    //           });
    //         console.log("restau");

    //         console.log(restau);
    //         const reservation = ReservationModel.create({
    //           restaurant,
    //           user,
    //           date: dateFormat,
    //           hours: hour,
    //           time,
    //           nbClients,
    //           statut: "confirmer",
    //         });
    //         console.log("before initializePlanning : ");

    //         let places = initializePlanning(
    //           restau.col,
    //           restau.places,
    //           place,
    //           reservation,
    //           nbClients
    //         );
    //         console.log("initializePlanning : ");
    //         console.log(places);

    //         const plann = PlanningModel.create({
    //           restaurant,
    //           date: dateFormat,
    //           hours: hour,
    //           places,
    //         });
    //       } else {
    //         //planning.places
    //       }
    //     }
    //   }
    // );
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

const initializePlanning = function (
  col,
  tableau,
  emplacement,
  reservation,
  nbpers
) {
  console.log("tableau muriella");
  console.log(tableau);
  console.log(emplacement);

  let arr = tableau.map(function (element, index) {
    console.log("boucle");
    for (let i = 0; i < col; i++) {
      console.log("i : " + i);
      console.log(element[i]);
      if (
        index == emplacement[0] &&
        i == emplacement[1] &&
        nbpers <= element[i]
      ) {
        console.log("dans la boucle if nbpers");
        element[i] = { place: element[i], reserve: nbpers, resa: reservation };
        console.log("element[i]");
        console.log(element);
      } else {
        element[i] = { place: element[i], reserve: null, resa: null };
        console.log("element[i]");
        console.log(element);
      }
    }
    console.log("before return ");
    //return [index, element];
    return element;
  });
  // console.log(arr);

  console.log("initialize");
  console.log("arr");
  console.log(arr);
  console.log(arr[0][1]);
  //let planning = new Map(arr);

  return arr;
};

// and refresh page if not available
module.exports.addPlanning = async (req, res) => {
  const { restaurant, user, location, places, date, hours } = req.body;
  console.log("addPlanning");
  const restaurantPlaces = await RestaurantModel.findById(
    restaurant,
    "places"
  ).exec();
  // const users = await PlanningModel.find().select("-password");

  try {
    place = initializePlanning;
    const planning = await PlanningModel.create({
      restaurant,
      user,
      location,
      places,
      date,
      hours,
    });
    console.log(res);
    res.status(201).json({ planning });
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
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
