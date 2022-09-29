import React, { useState } from "react";
import { Row, Col, Button } from "reactstrap";
import Srch from "./Search";


export default srch => {
  return (
    <div>
      <Row noGutters className="text-center align">
        <Col>
          <Button
            color="blue"
            className="restaurantname-btn">
            Choisissez le restaurant
          </Button>

          <Button
            color="none"
            className="book-table-btn"
            onClick={_ => {
              srch.setPage(1);
            }}
          >
            Réserver une table
          </Button>
        </Col>
      </Row>
      <Row>
      <Srch />
      </Row>
      <Row noGutters className="text-center big-img-container">
        <Col>
          <img
            src={require("../images/restaurant.jpg")}
            alt="restaurant"
            className="big-img"
          />
        </Col>
      </Row>

    </div>
  );
};