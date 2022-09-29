const mongoose = require("moongoose");

const reservationSchema = new mongoose.Schema({
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "restaurant",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  date: {
    type: Date,
  },
  hours: {
    type: String,
    maxlength: 20,
    minlength: 2,
  },
  nbClients: {
    type: Integer,
    required: true,
    max: 150,
    min: 1,
  },
});

const ReservationModel = mongoose.model("reservation", reservationSchema);
module.exports = ReservationModel;
