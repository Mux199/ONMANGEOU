import React from "react";
import { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { Navbar, Row, Col } from "reactstrap";
import { UidContext } from "./AppContext";

export default (props) => {
  const [uid, setUid] = useContext(UidContext);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">
          <NavLink exact to="/">
            <img
              src={require("../assets/img/Logo_onmangeou.png")}
              alt=""
              style={{ width: "150px" }}
            />
          </NavLink>
        </div>
        {uid && uid._id != null ? (
          <ul className="nav-links">
            {uid.role == "user" && (
              <li>
                <Link to={"/userProfil"}>
                  <button className="profil">Profil</button>
                </Link>
              </li>
            )}
            {uid.role == "professional" && (
              <li>
                <Link to={"/proProfil"}>
                  <button className="profil">Profil</button>
                </Link>
              </li>
            )}
            {uid.role == "admin" && (
              <li>
                <Link to={"/adminProfil"}>
                  <button className="profil">Profil</button>
                </Link>
              </li>
            )}
            <li>
              <Link to={"/logout"}>
                <button className="logout">Se deconnecter</button>
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="nav-links">
            <li>
              <Link to={"/connexion"}>
                <button className="connexion">Se connecter</button>
              </Link>
            </li>
            <li>
              <Link to={"/choice"}>
                <button className="signUpUser">Créer un compte</button>
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};
