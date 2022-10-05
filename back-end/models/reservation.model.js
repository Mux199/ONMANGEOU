const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const reservationSchema = new mongoose.Schema(
  {
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
    statut: {
      type: String,
      enum: ["confirmer", "en attente", "refus"],
    },
  },
  { timestamps: true }
);

reservationSchema.plugin(uniqueValidator);

const ReservationModel = mongoose.model("reservation", reservationSchema);
module.exports = ReservationModel;
