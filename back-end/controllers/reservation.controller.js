const ReservationModel = require("../models/reservation.model");
const PlanningModel = require("../models/planning.model");
const RestaurantModel = require("../models/restaurant.model");

const flattenArray = (matrix) => {
  let flattened = [];
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      flattened.push([[i, j], matrix[i][j]]);
    }
  }
  return flattened.sort((a, b) => a[1] - b[1]);
};

function possibleReservation(arr, value) {
  console.log(arr);
  console.log(value);

  let possible = false;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][1] >= value) {
      possible = true;
      console.log(arr[i][1]);
      console.log(value);
      console.log(arr[i][1] >= value);
      return possible;
    }
  }
  return possible;
}
const findBestPosition = (
  matrix,
  flattened,
  nbClients,
  resa,
  nbplaces,
  lastname
) => {
  let difference = Infinity;
  let bestPos = null;
  let bestValue = null;
  for (let i = 0; i < flattened.length; i++) {
    if (flattened[i][1] >= nbClients) {
      let currDifference = flattened[i][1] - nbClients;
      if (currDifference < difference) {
        difference = currDifference;
        bestPos = i;
        bestValue = flattened[i][1];
      }
    }
  }
  if (bestPos !== null) {
    matrix[flattened[bestPos][0][0]][flattened[bestPos][0][1]] = {
      resa: resa,
      placeUse: nbClients,
      placeTotal: bestValue,
      lastname: lastname,
    };
    flattened.splice(bestPos, 1);
  }

  return {
    newMatrix: matrix,
    flattened2: flattened,
    remainingPlaces: nbplaces - bestValue,
    bestPos,
  };
};

const findBestPositionAndCreate = (
  matrix,
  flattened,
  nbClients,
  resa,
  nbplaces,
  lastname
) => {
  let newMatrix = Array(matrix.length)
    .fill()
    .map(() => Array(matrix[0].length).fill(null));
  let difference = Infinity;
  let bestPos = null;
  let bestValue = null;
  for (let i = 0; i < flattened.length; i++) {
    if (flattened[i][1] >= nbClients) {
      let currDifference = flattened[i][1] - nbClients;
      if (currDifference < difference) {
        difference = currDifference;
        bestPos = i;
        bestValue = flattened[i][1];
      }
    }
    newMatrix[flattened[i][0][0]][flattened[i][0][1]] = {
      resa: null,
      placeUse: 0,
      placeTotal: flattened[i][1],
      lastname: "vide",
    };
  }
  if (bestPos !== null) {
    newMatrix[flattened[bestPos][0][0]][flattened[bestPos][0][1]] = {
      resa: resa,
      placeUse: nbClients,
      placeTotal: bestValue,
      lastname: lastname,
    };
    flattened.splice(bestPos, 1);
  }
  return {
    newMatrix,
    flattened2: flattened,
    remainingPlaces: nbplaces - bestValue,
  };
};

function cancelResa(matrix, flattenedArray, id, places) {
  let index = -1;
  let remainingPlaces = places;
  let newPlace = 0;
  let newPostion = [];
  const updatedMatrix = matrix.map((row, i) => {
    return row.map((reservation, j) => {
      if (reservation.resa && reservation.resa.toString() == id) {
        index = i * row.length + j;
        remainingPlaces += reservation.placeTotal;
        newPlace = reservation.placeUse;
        newPostion = [i, j];
        return {
          resa: null,
          placeUse: 0,
          placeTotal: reservation.placeTotal,
          lastname: "vide",
        };
      }
      return reservation;
    });
  });
  if (index !== -1) {
    let newElement = [newPostion, newPlace];
    let index = flattenedArray.length;
    for (let i = 0; i < flattenedArray.length; i++) {
      if (newElement[1] < flattenedArray[i][1]) {
        index = i;
        break;
      }
    }
    flattenedArray.splice(index, 0, newElement);
  }
  return {
    layout: updatedMatrix,
    disponibility: flattenedArray,
    remainingPlaces,
  };
}

module.exports.addReservation = async (req, res) => {
  const { restaurant, user, nbClients, date, hour, lastname } = req.body;
  console.log("req.body");
  console.log(req.body);

  // le système choisit la place
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

      if (planning == null) {
        const restau = await RestaurantModel.findById({
          _id: restaurant,
        }).exec();
        let flattened = flattenArray(restau.places);
        console.log("flattened");
        console.log(flattened);
        const possible = possibleReservation(flattened, nbClients);
        if (!possible) {
          console.log(!possible);

          return res.status(400).send({
            message:
              "Il n'y a plus de places disponibles pour le nombre de client voulu",
          });
        }
        const reservation = await ReservationModel.create({
          restaurant,
          user,
          date: dateFormat,
          hours: hour,
          time,
          nbClients,
          statut: "confirmé",
        });

        let { newMatrix, flattened2, remainingPlaces } =
          findBestPositionAndCreate(
            restau.places,
            flattened,
            nbClients,
            reservation._id,
            restau.nbplaces,
            lastname
          );

        const createPlanning = await PlanningModel.create({
          restaurant,
          date: dateFormat,
          hours: hour,
          layout: newMatrix,
          disponibility: flattened2,
          remainingPlaces,
          totalPlaces: restau.nbplaces,
        });
        return res.status(201).json({
          planning: createPlanning,
          reservation: reservation,
          message: "la reservation a bien été effectuée",
        });
      } else {
        // Le planning a déjà été instancié
        // choisir la place la plus adapté

        const possible = possibleReservation(planning.disponibility, nbClients);
        if (!possible) {
          return res.status(400).send({
            message:
              "Il n'y a plus de places disponibles pour le nombre de client voulu",
          });
        }

        const reservation = await ReservationModel.create({
          restaurant,
          user,
          date: dateFormat,
          hours: hour,
          time,
          nbClients,
          statut: "confirmé",
        });

        let { newMatrix, flattened2, remainingPlaces } = findBestPosition(
          planning.layout,
          planning.disponibility,
          nbClients,
          reservation._id,
          planning.remainingPlaces,
          lastname
        );

        let idPlanning = planning._id.toString();
        await PlanningModel.findOneAndUpdate(
          { _id: idPlanning },
          {
            $set: {
              layout: newMatrix,
              disponibility: flattened2,
              remainingPlaces: remainingPlaces,
            },
          },
          { new: true, upsert: true, setDefaultsOnInsert: true }
        )
          .then((docs) => {
            console.log(docs);
            return res.send({
              planning: docs,
              reservation: reservation,
              message: "la reservation a bien été effectuée",
            });
          })
          .catch((err) => {
            return res.status(500).send({ message: err });
          });
      }
    } else {
      // il y a deja une reservation
      // on renvoit un message d'erreur comme quoi une reservation existe
      console.log(
        "Vous avez déjà une reservation à cette date et meme tranche horaire (midi ou soir)"
      );
      return res.status(400).send({
        message:
          "Vous avez déjà une reservation à cette date et meme tranche horaire (midi ou soir)",
      });
    }
  } catch (err) {
    return res.status(500).send({
      message: "Il y a eu une erreur la reservation n'a pas été effectué",
      err: err,
    });
  }
};

module.exports.cancelReservation = async (req, res) => {
  const { _id, restaurant, date, hours } = req.body;
  try {
    const planning = await PlanningModel.findOne({
      restaurant: restaurant,
      hours: hours,
      date: date,
    }).exec();
    if (planning == null) {
      return res.status(400).send({
        message: "Il n'y a pas de reservation a annuler",
      });
    }
    let { layout, disponibility, remainingPlaces } = cancelResa(
      planning.layout,
      planning.disponibility,
      _id,
      planning.remainingPlaces
    );

    await ReservationModel.findOneAndUpdate(
      { _id: _id },
      { $set: { statut: "annulé" } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    )
      .then(() => {
        console.log(docs.statut);
      })
      .catch((err) => {
        console.log(err);
      });

    await PlanningModel.findOneAndUpdate(
      { _id: _id },
      {
        $set: {
          layout: layout,
          disponibility: disponibility,
          remainingPlaces: remainingPlaces,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    )
      .then(() => {
        return res.status(200).send({
          message: "la reservation a bien été annulée",
        });
      })
      .catch((err) => {
        return res.status(500).send({ message: err });
      });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

module.exports.getAllUserReservation = (req, res) => {
  ReservationModel.find({ user: req.params.id }, (err, docs) => {
    if (!err) {
      console.log(docs);
      res.status(200).send(docs);
    } else {
      return res.status(400).send(err);
    }
  });
};

module.exports.getAllRestaurantReservation = (req, res) => {
  ReservationModel.find({ restaurant: req.params.id }, (err, docs) => {
    if (!err) {
      console.log(docs);
      res.status(200).send(docs);
    } else {
      return res.status(400).send(err);
    }
  });
};

module.exports.getAllReservation = (req, res) => {
  const reservation = ReservationModel.find();
  return res.status(200).json(reservation);
};
