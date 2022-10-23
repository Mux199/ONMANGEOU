import React from "react";
import { Link } from "react-router-dom";
import { Navbar, NavbarBrand, Row, Col } from "reactstrap";
import Footer from "./Footer";

export default (props) => {
  return (
    <div className="navbar">
      <Navbar light expand="md">
        <div
          className="nav-brand"
          onClick={(_) => {
            props.setPage(0);
          }}
        >
          <Row>
            <Col color="primary">
              {" "}
              <a href="/">Bienvenue sur ONMANGEOÙ</a>
            </Col>
            <Col style={{ marginLeft: "800px" }}>
              <Link to={"/connexion"}>
                <button className="connexion">Se connecter</button>
              </Link>
              <Link to={"/choice"}>
                <button className="signUpUser">Créer un compte</button>
              </Link>
            </Col>
          </Row>
        </div>
      </Navbar>
    </div>
  );
};
