import React, { useState, useEffect } from "react";
import { Row, Col, Button } from "reactstrap";
import Search from "../components/Search";
import { useSelector } from "react-redux";

export default (props) => {
  const restausData = useSelector((state) => state.rootReducer.restausReducer);

  return (
    <div>
      <div className="research">
        <Row noGutters className="text-center align">
          <Col>
            <div className="titre">
              <h1>Choisissez le restaurant</h1>
            </div>
            {/* <Button 
              className="restaurantname-btn">
              Choisissez le restaurant
            </Button> */}
            {/* <Button
              className="book-table-btn">
              Réserver une table
            </Button> */}
          </Col>
        </Row>
        {/* <Row>
          <Search />
        </Row> */}
      </div>
      <Row
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          margin: "20px 0 0 0",
        }}
      >
        <Col>
          <Search />
        </Col>
        <Col md={6}>
          <img
            src={require("../assets/img/Cover.jpg")}
            style={{ width: "100%" }}
          />
        </Col>
      </Row>
    </div>
  );
};
