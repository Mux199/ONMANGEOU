import React, { useContext, useEffect } from "react";
import SideBar from "../components/SideBar";
//import { DatePicker } from "reactstrap-date-picker";
import { useState } from "react";
import { UidContext } from "../components/AppContext";
import { Row, Col } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { getRestaurantResa } from "../store/reducers/actions/reservation.actions";
import { getUsers } from "../store/reducers/actions/users.actions";
import Table_Reservation from "../components/TABLE_RESERVATION";
import { dateParser } from "../components/Utils";

const styles = {
  display: "flex",
  justifyContent: "flex-start",
};

export default function ProProfil() {
  const [uid, setUid] = useContext(UidContext);
  const dispatch = useDispatch();
  if (uid && uid._id) {
    dispatch(getRestaurantResa(uid._id));
  }
  dispatch(getUsers());
  const resaData = useSelector((state) => state.rootReducer.resaReducer);
  const usersData = useSelector((state) => state.rootReducer.usersReducer);
  const restausData = useSelector((state) => state.rootReducer.restausReducer);
  const [myResaData, setMyResaData] = useState(resaData);
  const ChooseDate = () => {
    const [startDate, setStartDate] = useState(new Date());
  };
  const [navigation, setNavigation] = useState("Réservations");

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
          {navigation == "Réservations" && (
            <Row className="reservation">
              <h1>Réservations</h1>
              <Row className="resa-container">
                {Array.isArray(myResaData) && myResaData ? (
                  <Table_Reservation
                    data={{
                      data: myResaData,
                      role: uid.role,
                      restaus: restausData,
                      users: usersData,
                    }}
                  />
                ) : (
                  <Table_Reservation data={[]} />
                )}
              </Row>
            </Row>
          )}
          {navigation == "Informations personnelles" && (
            <div>
              <h1>Informations personnelles</h1>
              <Row>
                <Col>Nom</Col>
              </Row>
              <Row>
                <Col>{userData && userData.lastname}</Col>
              </Row>
              <Row>
                <Col>Prénom</Col>
              </Row>
              <Row>
                <Col>{userData && userData.firstname}</Col>
              </Row>
              <Row>
                <Col>Email</Col>
              </Row>
              <Row>
                <Col>{userData && userData.email}</Col>
              </Row>
              <Row>
                <Col>Téléphone</Col>
              </Row>
              <Row>
                <Col>{userData && userData.telephone}</Col>
              </Row>
              <Row>
                <Col>Membre depuis le :</Col>
              </Row>
              <Row>
                <Col>
                  {userData && userData.createdAt
                    ? dateParser(userData.createdAt)
                    : ""}
                </Col>
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
