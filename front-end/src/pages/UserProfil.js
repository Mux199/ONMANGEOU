import React, { useContext, useState, useEffect } from "react";
import SideBar from "../components/SideBar";
import { Link } from "react-router-dom";
import { UidContext } from "../components/AppContext";
import { Row, Col } from "reactstrap";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const styles = {
  display: "flex",
  justifyContent: "flex-start",
};

export default function UserProfil() {
  const [uid, setUid] = useContext(UidContext);

  const userData = useSelector((state) => state.rootReducer.userReducer);
  console.log(userData);
  const ChooseDate = () => {
    const [startDate, setStartDate] = useState(new Date());
  };
  const [info, setInfo] = useState("Réservation");
  console.log("info " + info);

  /*
  if (uid._id == null || uid.role == "" || uid.role != "user") {
    <Navigate to="/connexion" />;
  }*/

  return (
    <div className="user-profil" style={styles}>
      <div>
        <SideBar info={info} setInfo={setInfo} />
      </div>

      <div className="">
        <Col className="">
          {info == "Réservation" && (
            <div>
              <h1>Reservation</h1>
              <Row>Reservation</Row>
            </div>
          )}
          {info == "Informations personnelles" && (
            <div>
              <h1>Informations personnelles</h1>
              <Row>
                <Col>Nom</Col>
              </Row>
              <Row>
                <Col>{userData.lastname}</Col>
              </Row>
              <Row>
                <Col>Prénom</Col>
              </Row>
              <Row>
                <Col>{userData.firstname}</Col>
              </Row>
              <Row>
                <Col>Email</Col>
              </Row>
              <Row>
                <Col>{userData.email}</Col>
              </Row>
              <Row>
                <Col>Téléphone</Col>
              </Row>
              <Row>
                <Col>{userData.telephone}</Col>
              </Row>
              <Row>
                <Col>Membre depuis le :</Col>
              </Row>
              <Row>
                <Col>{userData.createdAt.substr(0, 10)}</Col>
              </Row>
            </div>
          )}
          {console.log(info)}
          {info == "Historique" && (
            <div>
              <h1>Historique</h1>
              <Row>Historique</Row>
            </div>
          )}
        </Col>
      </div>
    </div>
  );
}
