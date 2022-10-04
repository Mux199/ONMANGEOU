import React, { useState, useEffect } from "react";
import Calendar from "react-calendar/dist/umd/Calendar";
import Table from "./Table";
export default (props) => {
  const [totalTables, setTotalTables] = useState([]);
  return (
    <div className="app">
        <h1 className="Entete">ONMANGEOU</h1>
        <div className="calendrier-container">
            <Calendar onChange={setDate} value={date} />
        </div>

        <div className="text-center">
            Selected date: {date.toDateString()}
        </div>
    </div>
)

  // User's selections
  const [selection, setSelection] = useState({
    table: {
      name: null,
      id: null,
    },
    date: new Date(),
    time: null,
    location: "Localisation",
    size: 0,
  });

  // Details sur le client
  const [booking, setBooking] = useState({
    name: "",
    phone: "",
    email: "",
  });

  // Liste d'endroit dispo
  const [locations] = useState(["Intérieur", "Terrasse"]);
  const [times] = useState([
    "12H",
    "13H",
    "14H",
    "18H",
    "19H",
    "20H",
    "21H",
    "22H",
  ]);
  // Validation
  const [reservationError, setReservationError] = useState(false);

  const getDate = (_) => {
    const months = [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Août",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre",
    ];
    const date =
      months[selection.date.getMonth()] +
      " " +
      selection.date.getDate() +
      " " +
      selection.date.getFullYear();
    let time = selection.time.slice(0, -2);
    time = selection.time > 24 ? time + 24 + ":00" : time + ":00";
    console.log(time);
    const datetime = new Date(date + " " + time);
    return datetime;
  };
};
