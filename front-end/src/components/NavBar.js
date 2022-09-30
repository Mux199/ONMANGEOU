import React from "react";
import { Link } from "react-router-dom";
import { Navbar, NavbarBrand, Row, Col } from "reactstrap";

export default (props) => {
  return (
    <div className="navbar">
      <Navbar color="light" light expand="md">
        <NavbarBrand
          className="nav-brand"
          onClick={(_) => {
            props.setPage(0);
          }}
        >
          <Row>
            <Col>Bienvenue sur ONMANGEOU</Col>
            <Col style={{ marginLeft: "800px" }}>
              <Link to={"/connexion"}>
                <button>Se connecter</button>
              </Link>
              <Link to={"/account"}>
                <button>Créer un compte</button>
              </Link>
            </Col>
          </Row>
        </NavbarBrand>
      </Navbar>
    </div>
  );
};
