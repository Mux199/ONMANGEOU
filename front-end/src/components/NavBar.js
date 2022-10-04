import React from "react";
import { Link } from "react-router-dom";
import { Navbar, NavbarBrand, Row, Col } from "reactstrap";

export default (props) => {
  return (
    <div className="navbar">
      <Navbar light expand="md">
        <NavbarBrand
          className="nav-brand"
          onClick={(_) => {
            props.setPage(0);
          }}
        >
          <Row>
            <Col color="primary"> <a href="/">Bienvenue sur ONMANGEOU</a>
            </Col>
            <Col style={{ marginLeft: "800px" }}>
              <Link to={"/connexion"}>
                <button>Se connecter</button>
              </Link>
              <Link to={"/account"}>
                <button>Créer un compte</button>
              </Link>
              <Link to={"/faq"}>
                <button>FAQ</button>
              </Link>
            </Col>
          </Row>
        </NavbarBrand>
      </Navbar>
    </div>
  );
};
