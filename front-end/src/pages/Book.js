import React, { useState, useEffect } from "react";
import Table from "./Table";
import axios from "axios";
import {
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  Button,
} from "reactstrap";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactDOM from "react-dom";
import PlanningResa from "../components/PlanningResa";
function printPlanning(matrix) {}

//export default (props) => {
const Book = (props) => {
  const dispatch = useDispatch();
  let location = useLocation();
  const search = location.search;
  const queryParams = new URLSearchParams(search);
  const id = queryParams.get("id");

  const userData = useSelector((state) => state.rootReducer.userReducer);
  const [totalTables] = useState([]);
  const [planning, setPlanning] = useState([]);
  const [messageResponse, setMessageResponse] = useState([]);
  let date = new Date();

  const [booking, setBooking] = useState({
    table: {
      name: null,
      id: null,
    },
    lastname: userData && userData.users ? userData.users.lastname : "",
    user: userData && userData.users ? userData.users._id : "",
    hour: null,
    date: date,
    location: "Emplacement",
    nbClients: 0,
    restaurant: id,
  });

  useEffect(() => {
    if (userData && userData.users) {
      setBooking({
        ...booking,
        user: userData.users._id,
        lastname: userData.users.lastname,
      });
    }
  }, [userData]);

  const [locations] = useState(["Intérieur"]);
  const [times] = useState([
    "12H00",
    "13H00",
    "14H00",
    "18H00",
    "19H00",
    "20H00",
    "21H00",
    "22H00",
  ]);

  const [reservationError, setReservationError] = useState(false);

  const getDate = (date) => {
    const date2 = new Date(date);
    const year = date2.getFullYear();
    const month = `0${date2.getMonth() + 1}`.slice(-2);
    const day = `0${date2.getDate()}`.slice(-2);
    const formattedDate = `${month}/${day}/${year}`;
    return formattedDate;
  };

  const getEmptyTables = (_) => {
    let tables = totalTables.filter((table) => table.isAvailable);
    return tables.length;
  };

  // Clicking on a table sets the selection state
  const selectTable = (table_name, table_id) => {
    setBooking({
      ...booking,
      table: {
        name: table_name,
        id: table_id,
      },
    });
  };
  // Generate locations dropdown
  const getTimes = (_) => {
    let newTimes = [];
    times.forEach((time) => {
      newTimes.push(
        <DropdownItem
          key={time}
          className="booking-dropdown-item"
          onClick={(_) => {
            let newSel = {
              ...booking,
              hour: time,
            };
            setBooking(newSel);
          }}
        >
          {time}
        </DropdownItem>
      );
    });
    return newTimes;
  };

  const handleResa = async (event) => {
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    if (
      (booking.lastname.length === 0) |
      (booking.restaurant.length === 0) |
      (booking.user === 0) |
      (booking.hour == null)
    ) {
      console.log("Informations incomplètes");
      setReservationError(true);
    } else {
      setReservationError(false);

      const datetime = getDate();
      /*
      let res = await fetch(
        `${process.env.REACT_APP_API_URL}api/reservation/addReservation/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: booking,
        }
      );*/
      setBooking({
        ...booking,
        date: getDate(booking.date),
      });
      var responseDisplay = document.getElementsByClassName(
        "table-display-message"
      );
      try {
        let res = await axios({
          method: "post",
          url: `${process.env.REACT_APP_API_URL}api/reservation/addReservation/`,
          withCredentials: true,
          data: booking,
        });
        console.log(
          "La révervation est faite: " + res.data && res.data.message
            ? res.data.message
            : "vide"
        );

        if (res.data.planning) {
          //responseDisplay[0].innerHTML = res.data.message;
          setMessageResponse(res.data.message);
          setPlanning(res.data.planning.layout);
        } else {
          responseDisplay[0].innerHTML = res.data.message;
          setMessageResponse(res.data.message);
        }
      } catch (err) {
        console.log(err);
        if (err.response && err.response.data && err.response.data.message) {
          responseDisplay[0].innerHTML = err.response.data.message;
        } else {
          responseDisplay[0].innerHTML =
            "Une erreur s'est produite veuillez recommencer";
        }
      }
    }
  };

  useEffect(() => {
    handleResa();
  }, []);

  useEffect(() => {
    if (planning) {
      const rootElement = document.getElementsByClassName(
        "table-display-message"
      )[0];
      ReactDOM.createRoot(rootElement).render(
        <PlanningResa layout={planning} message={messageResponse} />
      );
    }
  }, [planning]);

  // Generating tables from available tables state
  const getTables = (_) => {
    console.log("Choisir une table");
    if (getEmptyTables() > 0) {
      let tables = [];
      totalTables.forEach((table) => {
        if (table.isAvailable) {
          tables.push(
            <Table
              key={table._id}
              id={table._id}
              chairs={table.capacity}
              name={table.name}
              empty
              selectTable={selectTable}
            />
          );
        } else {
          tables.push(
            <Table
              key={table._id}
              id={table._id}
              chairs={table.capacity}
              name={table.name}
              selectTable={selectTable}
            />
          );
        }
      });
      return tables;
    }
  };
  // Generate party size dropdown
  const getSizes = (_) => {
    let newSizes = [];

    for (let i = 1; i < 11; i++) {
      newSizes.push(
        <DropdownItem
          key={i}
          className="booking-dropdown-item"
          onClick={(_) => {
            let newSel = {
              ...booking,
              nbClients: i,
            };
            setBooking(newSel);
          }}
        >
          {i}
        </DropdownItem>
      );
    }
    return newSizes;
  };

  // Generate locations dropdown
  const getLocations = (_) => {
    let newLocations = [];
    locations.forEach((loc) => {
      newLocations.push(
        <DropdownItem
          key={loc}
          className="booking-dropdown-item"
          onClick={(_) => {
            let newSel = {
              ...booking,
              location: loc,
            };
            setBooking(newSel);
          }}
        >
          {loc}
        </DropdownItem>
      );
    });
    return newLocations;
  };

  return (
    // <div className="app">
    //     <h1 className="Entete">ONMANGEOÙ</h1>

    // </div>
    <div className="book">
      <Row noGutters className="text-center">
        <Col>
          <p className="looking-for-restaurant">
            {!booking.table.id
              ? "Réserver une Table"
              : "Confirmer la réservation"}
            <i
              className={
                !booking.table.id ? "fas fa-chair" : "fas fa-clipboard-check"
              }
            ></i>
          </p>
          <p className="selected-table">
            {booking.table.id
              ? "Vous reservez une table " + booking.table.name
              : null}
          </p>

          {reservationError ? (
            <p className="reservation-error">
              * Veuillez remplir tous les champs
            </p>
          ) : null}
        </Col>
      </Row>

      {!booking.table.id ? (
        <div id="reservation-stuff">
          <Row noGutters className="text-center align-items-center">
            <Col xs="12" sm="3">
              <input
                min={date.toISOString().substr(0, 10)}
                type="date"
                required="required"
                className="booking-dropdown"
                value={date.toISOString().split("T")[0]}
                onChange={(e) => {
                  if (!isNaN(new Date(new Date(e.target.value)))) {
                    let newSel = {
                      ...booking,
                      date: new Date(e.target.value),
                    };
                    setBooking(newSel);
                  } else {
                    console.log("Invalid date");
                    let newSel = {
                      ...booking,
                      date: new Date(),
                    };
                    setBooking(newSel);
                  }
                }}
              ></input>
            </Col>
            <Col xs="12" sm="3">
              <UncontrolledDropdown>
                <DropdownToggle color="none" caret className="booking-dropdown">
                  {booking.hour === null ? "Choisir l'heure" : booking.hour}
                </DropdownToggle>
                <DropdownMenu right className="booking-dropdown-menu">
                  {getTimes()}
                </DropdownMenu>
              </UncontrolledDropdown>
            </Col>
            <Col xs="12" sm="3">
              <UncontrolledDropdown>
                <DropdownToggle color="none" caret className="booking-dropdown">
                  {booking.location}
                </DropdownToggle>
                <DropdownMenu right className="booking-dropdown-menu">
                  {getLocations()}
                </DropdownMenu>
              </UncontrolledDropdown>
            </Col>
            <Col xs="12" sm="3">
              <UncontrolledDropdown>
                <DropdownToggle color="none" caret className="booking-dropdown">
                  {booking.nbClients === 0
                    ? "Choisir le nombre de place"
                    : booking.nbClients.toString()}
                </DropdownToggle>
                <DropdownMenu right className="booking-dropdown-menu">
                  {getSizes()}
                </DropdownMenu>
              </UncontrolledDropdown>
            </Col>
            <Col>
              <Button onClick={handleResa}>Réserver</Button>
            </Col>
          </Row>
          <Row noGutters className="tables-display">
            <Col>
              {getEmptyTables() > 0 ? (
                <p className="available-tables">
                  {getEmptyTables()} Disponible
                </p>
              ) : null}
              {booking.date && booking.hour ? (
                getEmptyTables() > 0 ? (
                  <div>
                    <div className="table-key">
                      <span className="empty-table"></span> &nbsp; Disponible
                      &nbsp;&nbsp;
                      <span className="full-table"></span> &nbsp; Occupée
                      &nbsp;&nbsp;
                    </div>
                    <Row noGutters>{getTables()}</Row>
                  </div>
                ) : (
                  <div className="table-display-message">
                    Veuillez reserver une table
                  </div>
                )
              ) : (
                <div className="table-display-message">
                  Veuillez choisir la date et l'heure de votre réservation.
                </div>
              )}
            </Col>
          </Row>
        </div>
      ) : (
        <div id="confirm-reservation-stuff">
          <Row
            noGutters
            className="text-center justify-content-center reservation-details-container"
          ></Row>
        </div>
      )}
    </div>
  );
};

export default Book;
