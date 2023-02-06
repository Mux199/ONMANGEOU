import React, { useContext, useState, useEffect } from "react";
import SideBar from "../components/SideBar";
import { Link } from "react-router-dom";
import { UidContext } from "../components/AppContext";
import { Row, Col } from "reactstrap";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateTelephone } from "../store/reducers/actions/user.actions";
//import { cancelReservation } from "../store/reducers/actions/reservation.actions";

import { dateParser } from "../components/Utils";

const styles = {
  display: "flex",
  justifyContent: "flex-start",
};

export default function UserProfil() {
  const [uid, setUid] = useContext(UidContext);

  const userData = useSelector((state) => state.rootReducer.userReducer);
  const restausData = useSelector((state) => state.rootReducer.restausReducer);
  const resaData = useSelector((state) => state.rootReducer.resaReducer);

  console.log(restausData);
  console.log(resaData);

  const dispatch = useDispatch();

  const [myResaData, setMyResaData] = useState(resaData);

  useEffect(() => {
    setMyResaData(resaData);
  }, []);

  console.log("myResaData");
  console.log(myResaData);

  /*const handleCancel = (id, date, hours) => {
    dispatch(cancelReservation(id, date, hours));
    setMyResaData(myResaData.filter((item) => item.id !== id));
  };
  */

  const handleCancel = (id) => {
    console.log(id + " id cancel");
  };

  const ChooseDate = () => {
    const [startDate, setStartDate] = useState(new Date());
  };
  const [navigation, setNavigation] = useState("Réservation");
  const [telephone, setTelephone] = useState("");
  const [updateForm, setUpdateForm] = useState(false);

  const todayDate = new Date();

  const handleUpdate = () => {
    dispatch(updateTelephone(userData._id, telephone));
    setUpdateForm(false);
  };
  let util = "user";
  return (
    <div className="user-profil" style={styles}>
      <div>
        <SideBar
          navigation={navigation}
          setNavigation={setNavigation}
          util={util}
        />
      </div>

      <div className="">
        <Row className="">
          {navigation == "Réservation" && (
            <Row className="reservation">
              <h1>Reservation</h1>
              <Row className="resa-container">
                {Array.isArray(myResaData) &&
                  typeof myResaData.map === "function" &&
                  myResaData.map((item, index) => (
                    <div key={index} id={item.id}>
                      {Object.keys(item).map((key) => {
                        if (key === "id") return null;
                        return (
                          <div key={key}>
                            <span>{key}:</span>
                            <span>{item[key]}</span>
                          </div>
                        );
                      })}
                      <span>
                        <button
                          onClick={() =>
                            handleCancel(item.id, item.date, item.hours)
                          }
                        >
                          Cancel
                        </button>
                      </span>
                    </div>
                  ))}
              </Row>
            </Row>
          )}
          {navigation == "Informations personnelles" && (
            <Row className="info-perso">
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
              <Row className="telephone-update">
                <Col>Téléphone</Col>
              </Row>
              <Row>
                {updateForm == false && (
                  <>
                    <Col onClick={() => setUpdateForm(!updateForm)}>
                      {userData.telephone}
                    </Col>
                    <Col>
                      <button onClick={() => setUpdateForm(!updateForm)}>
                        Modifier Telephone
                      </button>
                    </Col>
                  </>
                )}
                {updateForm && (
                  <>
                    <Col>
                      <textarea
                        type="text"
                        defaultValue={userData.telephone}
                        onChange={(e) => setTelephone(e.target.value)}
                      ></textarea>
                    </Col>
                    <Col>
                      <button onClick={handleUpdate}>
                        Valider modifications
                      </button>
                    </Col>
                  </>
                )}
              </Row>
              <Row>
                <Col>Membre depuis le :</Col>
              </Row>
              <Row>
                <Col>{dateParser(userData.createdAt)}</Col>
              </Row>
            </Row>
          )}
          {navigation == "Favoris" && (
            <Row className="favorite">
              <h1>Favoris</h1>
              <Row>Favoris</Row>
              <Row>
                Nombre de favoris :{" "}
                {userData.likes ? userData.likes.length : ""}
              </Row>
            </Row>
          )}
          {navigation == "Historique" && (
            <Row className="history">
              <h1>Historique</h1>
              <Row>Historique</Row>
            </Row>
          )}
        </Row>
      </div>
    </div>
  );
}
