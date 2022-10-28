import { type } from "@testing-library/user-event/dist/type";
import React from "react";
import { Row, Col, Container,Button } from "reactstrap";
import { Link } from "react-router-dom";

function Search() {
  return (
    <div className="search" style={{ width: '100%'}}>
      <Row
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Col xs="6">
          <div className="searchBar">
            <input
              type="text"
              name="searchBar"
              id="searchBar"
              placeholder="Trouver votre restaurant"
            />
          </div>
        </Col>
        <Col xs="6">
        <Link to={'/Book'}>
          <button>Valider</button>
          </Link>
        </Col>
      </Row>
    </div>
  );
}

export default Search;
