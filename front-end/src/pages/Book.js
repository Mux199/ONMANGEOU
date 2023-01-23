import React, { useState, useEffect } from "react";
import Table from "./Table";
import SideBar from "../components/SideBar";
import {
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  Button
} from "reactstrap";
export default (props) => {
  const [totalTables, setTotalTables] = useState([]);
  const [selection, setSelection] = useState({
    table: {
      name: null,
      id: null
    },
    date: new Date(),
    time: null,
    location: "Emplacement",
    size: 0
  });

  let date = new Date()

  const [booking, setBooking] = useState({
    name: "",
    phone: "",
    email: ""
  });

  const [locations] = useState(["Intérieur", "Terrasse"]);
  const [times] = useState([
    "12H",
    "13H",
    "14H",
    "18H",
    "19H",
    "20H",
    "21H",
    "22H"
  ]);

  const [reservationError, setReservationError] = useState(false);

  const getDate = _ => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
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

const getEmptyTables = _ => {
  let tables = totalTables.filter(table => table.isAvailable);
  return tables.length;
};


 // Clicking on a table sets the selection state
 const selectTable = (table_name, table_id) => {
  setSelection({
    ...selection,
    table: {
      name: table_name,
      id: table_id
    }
  });
};
// Generate locations dropdown
const getTimes = _ => {
  let newTimes = [];
  times.forEach(time => {
    newTimes.push(
      <DropdownItem
        key={time}
        className="booking-dropdown-item"
        onClick={_ => {
          let newSel = {
            ...selection,
            table: {
              ...selection.table
            },
            time: time
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

const reserver = async _ => {
  if (
    (booking.name.length === 0) |
    (booking.phone.length === 0) |
    (booking.email.length === 0)
  ) {
    console.log("Informations incomplètes");
    setReservationError(true);
  } else {
    const datetime = getDate();
    let res = await fetch("http://localhost:5000/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...booking,
        date: datetime,
        table: selection.table.id
      })
    });
    res = await res.text();
    console.log("La révervation est faite: " + res);
    props.setPage(2);
  }
};

  // Generating tables from available tables state
  const getTables = _ => {
    console.log("Choisir une table");
    if (getEmptyTables() > 0) {
      let tables = [];
      totalTables.forEach(table => {
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
const getSizes = _ => {
  let newSizes = [];

  for (let i = 1; i < 8; i++) {
    newSizes.push(
      <DropdownItem
        key={i}
        className="booking-dropdown-item"
        onClick={e => {
          let newSel = {
            ...selection,
            table: {
              ...selection.table
            },
            size: i
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
  const getLocations = _ => {
    let newLocations = [];
    locations.forEach(loc => {
      newLocations.push(
        <DropdownItem
          key={loc}
          className="booking-dropdown-item"
          onClick={_ => {
            let newSel = {
              ...selection,
              table: {
                ...selection.table
              },
              location: loc
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

  const styles = {
    display: "flex",
    justifyContent: "space-between",
  };


  return (
    // <div className="app">
    //     <h1 className="Entete">ONMANGEOÙ</h1>
      
    // </div>
    <div>
    <Row noGutters className="text-center">
      <Col>
        <p className="looking-for-restaurant">
          {!selection.table.id ? "Réserver une Table" : "Confirmer la réservation"}
          <i
            className={
              !selection.table.id
                ? "fas fa-chair"
                : "fas fa-clipboard-check"
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
              min={date.toISOString().substr(0,10)}
              type="date"
              required="required"
              className="booking-dropdown"
              value={selection.date.toISOString().split("T")[0]}
              onChange={e => {
                if (!isNaN(new Date(new Date(e.target.value)))) {
                  let newSel = {
                    ...selection,
                    table: {
                      ...selection.table
                    },
                    date: new Date(e.target.value)
                  };
                  setSelection(newSel);
                } else {
                  console.log("Invalid date");
                  let newSel = {
                    ...selection,
                    table: {
                      ...selection.table
                    },
                    date: new Date()
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
        </Row>
        <Row noGutters className="tables-display">
          <Col>
            {getEmptyTables() > 0 ? (
              <p className="available-tables">{getEmptyTables()} Disponible</p>
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
                <p className="table-display-message">Aucune table disponible</p>
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
        >
          <Col xs="12" sm="3" className="reservation-details">
            <Input
              type="text"
              bsSize="lg"
              placeholder="Name"
              className="reservation-input"
              value={booking.name}
              onChange={e => {
                setBooking({
                  ...booking,
                  name: e.target.value
                });
              }}
            />
          </Col>
          <Col xs="12" sm="3" className="reservation-details">
            <Input
              type="text"
              bsSize="lg"
              placeholder="Phone Number"
              className="reservation-input"
              value={booking.phone}
              onChange={e => {
                setBooking({
                  ...booking,
                  phone: e.target.value
                });
              }}
            />
          </Col>
          <Col xs="12" sm="3" className="reservation-details">
            <Input
              type="text"
              bsSize="lg"
              placeholder="Email"
              className="reservation-input"
              value={booking.email}
              onChange={e => {
                setBooking({
                  ...booking,
                  email: e.target.value
                });
              }}
            />
          </Col>
        </Row>
        <Row noGutters className="text-center">
          <Col>
            <Button
              color="none"
              className="book-table-btn"
              onClick={_ => {
                reserver();
              }}
            >
              Réserver
            </Button>
          </Col>
        </Row>
      </div>
    )}
    
  </div>
)



};
