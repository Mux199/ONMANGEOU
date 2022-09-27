import React, { useState } from "react";
import { Row, Col, Button } from "reactstrap";
import Search from "./Search";


export default props => {
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
              props.setPage(1);
            }}
          >
            Réserver une table
          </Button>
        </Col>
      </Row>
      <Row>
      <Search />
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