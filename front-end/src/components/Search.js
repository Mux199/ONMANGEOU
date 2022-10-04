import { type } from "@testing-library/user-event/dist/type";
import React from "react";
import { Row, Col, Container } from "reactstrap";

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
          <button>Valider</button>
        </Col>
      </Row>
    </div>
  );
}

export default Search;
