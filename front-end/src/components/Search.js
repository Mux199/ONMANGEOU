import { type } from "@testing-library/user-event/dist/type";
import React from "react";
import { Row, Col, Container } from "reactstrap";

function Search() {
  return (
    <div className="search">
      <Row
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Col xs="3">
          <div className="searchBar">
            <input
              type="text"
              name="searchBar"
              id="searchBar"
              placeholder="Trouver votre restaurant"
            />
          </div>
        </Col>
        <Col xs="2">
          <button>Valider</button>
        </Col>
      </Row>
    </div>
  );
}

export default Search;
