import React, { useContext, useEffect } from "react";
import SideBar from "../components/SideBar";
import { DatePicker } from "reactstrap-date-picker";
import { useState } from "react";
import { UidContext } from "../components/AppContext";
import { Navigate } from "react-router-dom";
import { Row, Col } from "reactstrap";
import { useSelector } from "react-redux";

const styles = {
  display: "flex",
  justifyContent: "flex-start",
};

export default function ProProfil() {
  const ChooseDate = () => {
    const [startDate, setStartDate] = useState(new Date());
  };
  const [navigation, setNavigation] = useState("Réservation");

  const [uid, setUid] = useContext(UidContext);
  const userData = useSelector((state) => state.rootReducer.userReducer);
  console.log(userData);
  console.log("uid");
  console.log(uid);

  /*
  <img
  src={require("../assets/img/restaurantanimationdribbble.gif")}
  alt=""
  style={{ width: "150px" }}
/>
*/
  /*
  if (uid._id == null || uid.role == "" || uid.role != "profesionnal") {
    <Navigate to="/connexion" />;
  }
*/
  let util = "pro";

  return (
    <div className="pro-profil" style={styles}>
      <div>
        <SideBar
          navigation={navigation}
          setNavigation={setNavigation}
          util={util}
        />
      </div>

      <div className="">
        <Col className="">
          {navigation == "Réservation" && (
            <div>
              <h1>Reservation</h1>
              <Row>Reservation</Row>
            </div>
          )}
          {navigation == "Informations personnelles" && (
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
          {console.log(navigation)}
          {navigation == "Historique" && (
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
