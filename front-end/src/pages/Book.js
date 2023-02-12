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
import { addResa } from "../store/reducers/actions/addResa.actions";
import PlanningResa from "../components/PlanningResa";
function printPlanning(matrix) {}

//export default (props) => {
const Book = (props) => {
  const dispatch = useDispatch();
  let { state } = useLocation();
  console.log("state");

  const userData = useSelector((state) => state.rootReducer.userReducer);
  const [userDataNew, setUserData] = useState({
    lastname: "",
    user: "",
    _id: "",
  });
  /*if (userData && userData.users) {
    setUserData(userData.users);
  }*/
  console.log("userData");

  console.log(userData);
  console.log("userDataNew");

  //setUserData(userData.users);
  console.log(userDataNew);

  console.log(state);
  const [totalTables] = useState([]);
  const [planning, setPlanning] = useState([]);
  const [messageResponse, setMessageResponse] = useState([]);
  const [selection, setSelection] = useState({
    table: {
      name: null,
      id: null,
    },
    date: new Date(),
    time: null,
    location: "Emplacement",
    size: 0,
  });
  console.log("selection");
  console.log(selection);
  let date = new Date();

  const [booking, setBooking] = useState({
    lastname: userDataNew.lastname,
    user: userDataNew._id,
    email: userDataNew.lastname,
    hour: selection.time,
    date: selection.date,
    nbClients: selection.size,
    restaurant: state,
  });

  useEffect(() => {
    if (userData && userData.users) setUserData(userData.users);
    console.log(userDataNew);
  }, []);

  useEffect(() => {
    console.log("booking");

    setBooking({
      lastname: userDataNew.lastname,
      user: userDataNew._id,
      email: userDataNew.lastname,
      hour: selection.time,
      date: selection.date,
      nbClients: selection.size,
      restaurant: state,
    });
    console.log(booking);
  }, []);
  /*
  const handleResa2 = function () {
    console.log("handleresa");
    //restaurant, user, nbClients, date, hour, lastname;

    //setResa(dispatch(addResa(state, userDataNew._id)));
    console.log(resa);
  };
  */
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
    setSelection({
      ...selection,
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
              ...selection,
              table: {
                ...selection.table,
              },
              time: time,
            };
            setSelection(newSel);
          }}
        >
          {time}
        </DropdownItem>
      );
    });
    return newTimes;
  };

  const handleResa = async (event) => {
    event.preventDefault();
    console.log("booking");
    console.log(booking);
    console.log("date");
    console.log(getDate(selection.date));
    console.log("time");
    console.log(selection.time);

    setBooking({
      lastname: userDataNew.lastname,
      user: userDataNew._id,
      hour: selection.time,
      date: getDate(selection.date),
      nbClients: selection.size,
      restaurant: state,
    });
    console.log("booking");
    console.log(booking);
    if (
      (booking.lastname.length === 0) |
      (booking.restaurant.length === 0) |
      (booking.user === 0) |
      (selection.time == null)
    ) {
      console.log("Informations incomplètes");
      setReservationError(true);
    } else {
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
      console.log("booking");
      console.log(booking);
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
        console.log(res);
        console.log(
          "La révervation est faite: " + res.data && res.data.message
            ? res.data.message
            : "vide"
        );

        console.log("la res de axios");
        console.log(res.data);
        if (res.data.planning) {
          responseDisplay[0].innerHTML = PlanningResa();
          setMessageResponse(res.data.message);
          setPlanning(res.data.planning.layout);
        } else {
          responseDisplay[0].innerHTML = res.data.message;
          setMessageResponse(res.data.message);
        }
      } catch (err) {
        console.log(err);
        responseDisplay[0].innerHTML =
          "Une erreur s'est produite veuillez recommencer";
      }
      //res = await res.text();
      //table-display-message
    }
  };

  useEffect(() => {
    handleResa();
  }, []);
  useEffect(() => {
    if (planning) {
      const element = document.getElementsByClassName("table-display-message");
      element.innerHTML = "";
      planning.forEach((item) => {
        element.innerHTML += React.renderToString(<PlanningResa item={item} />);
      });
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
          onClick={(e) => {
            let newSel = {
              ...selection,
              table: {
                ...selection.table,
              },
              size: i,
            };
            setSelection(newSel);
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
              ...selection,
              table: {
                ...selection.table,
              },
              location: loc,
            };
            setSelection(newSel);
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
    <div>
      <Row noGutters className="text-center">
        <Col>
          <p className="looking-for-restaurant">
            {!selection.table.id
              ? "Réserver une Table"
              : "Confirmer la réservation"}
            <i
              className={
                !selection.table.id ? "fas fa-chair" : "fas fa-clipboard-check"
              }
            ></i>
          </p>
          <p className="selected-table">
            {selection.table.id
              ? "Vous reservez une table " + selection.table.name
              : null}
          </p>

          {reservationError ? (
            <p className="reservation-error">
              * Veuillez remplir tous les champs
            </p>
          ) : null}
        </Col>
      </Row>

      {!selection.table.id ? (
        <div id="reservation-stuff">
          <Row noGutters className="text-center align-items-center">
            <Col xs="12" sm="3">
              <input
                min={date.toISOString().substr(0, 10)}
                type="date"
                required="required"
                className="booking-dropdown"
                value={selection.date.toISOString().split("T")[0]}
                onChange={(e) => {
                  if (!isNaN(new Date(new Date(e.target.value)))) {
                    let newSel = {
                      ...selection,
                      table: {
                        ...selection.table,
                      },
                      date: new Date(e.target.value),
                    };
                    setSelection(newSel);
                  } else {
                    console.log("Invalid date");
                    let newSel = {
                      ...selection,
                      table: {
                        ...selection.table,
                      },
                      date: new Date(),
                    };
                    setSelection(newSel);
                  }
                }}
              ></input>
            </Col>
            <Col xs="12" sm="3">
              <UncontrolledDropdown>
                <DropdownToggle color="none" caret className="booking-dropdown">
                  {selection.time === null ? "Choisir l'heure" : selection.time}
                </DropdownToggle>
                <DropdownMenu right className="booking-dropdown-menu">
                  {getTimes()}
                </DropdownMenu>
              </UncontrolledDropdown>
            </Col>
            <Col xs="12" sm="3">
              <UncontrolledDropdown>
                <DropdownToggle color="none" caret className="booking-dropdown">
                  {selection.location}
                </DropdownToggle>
                <DropdownMenu right className="booking-dropdown-menu">
                  {getLocations()}
                </DropdownMenu>
              </UncontrolledDropdown>
            </Col>
            <Col xs="12" sm="3">
              <UncontrolledDropdown>
                <DropdownToggle color="none" caret className="booking-dropdown">
                  {selection.size === 0
                    ? "Choisir le nombre de place"
                    : selection.size.toString()}
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

              {selection.date && selection.time ? (
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
                  <p className="table-display-message">
                    Aucune table disponible
                  </p>
                )
              ) : (
                <p className="table-display-message">
                  Veuillez choisir la date et l'heurre de votre réservation.
                </p>
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
