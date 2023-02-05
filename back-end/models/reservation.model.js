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
      maxlength: 5,
      minlength: 5,
      enum: [
        "12H00",
        "13H00",
        "14H00",
        "18H00",
        "19H00",
        "20H00",
        "21H00",
        "22H00",
      ],
    },
    time: {
      type: String,
      enum: ["midi", "soir"],
      required: true,
    },
    nbClients: {
      type: Number,
      required: true,
      max: 10,
      min: 1,
    },
    statut: {
      type: String,
      enum: ["confirmé", "annulé"],
    },
    note: {
      type: Number,
      default: 5,
    },
  },
  { timestamps: true }
);

reservationSchema.plugin(uniqueValidator);

const ReservationModel = mongoose.model("reservation", reservationSchema);
module.exports = ReservationModel;
