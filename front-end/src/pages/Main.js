import React from "react";
import { Row, Col, Button } from "reactstrap";
import Search from "../components/Search";

export default (props) => {
  return (
    <div className="main">
      <Row noGutters className="text-center align">
        <Col>
          <Button 
            className="restaurantname-btn">
            Choisissez le restaurant
          </Button>
          <Button
            className="book-table-btn">
            <a href="/Calendrier">
            Réserver une table
            </a>
          </Button>
        </Col>
      </Row>
      <Row>
        <Search />
      </Row>
    </div>
  );
};
