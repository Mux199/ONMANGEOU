import React from "react";
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";

export default (props) => {
  return (
    <div className="main">
      <Row className="header-main align">
        <Link to={"/rechercheRestaurant"}>
          <img
            src={require("../assets/img/header.png")}
            style={{ width: "auto", height: "70vh" }}
          />
        </Link>
      </Row>
    </div>
  );
};
