import React, { useContext, useState, useEffect } from "react";
import SideBar from "../components/SideBar";
import { Link } from "react-router-dom";
import { UidContext } from "../components/AppContext";
import { Row, Col } from "reactstrap";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateTelephone } from "../store/reducers/actions/user.actions";
import { dateParser } from "../components/Utils";

const styles = {
  display: "flex",
  justifyContent: "flex-start",
};

export default function UserProfil() {
  const [uid, setUid] = useContext(UidContext);

  const userData = useSelector((state) => state.rootReducer.userReducer);
  const ChooseDate = () => {
    const [startDate, setStartDate] = useState(new Date());
  };
  const [navigation, setNavigation] = useState("Réservation");
  const [telephone, setTelephone] = useState("");
  const [updateForm, setUpdateForm] = useState(false);
  const dispatch = useDispatch();

  const handleUpdate = () => {
    dispatch(updateTelephone(userData._id, telephone));
    setUpdateForm(false);
  };

  /*
  if (uid._id == null || uid.role == "" || uid.role != "user") {
    <Navigate to="/connexion" />;
  }*/

  return (
    <div className="user-profil" style={styles}>
      <div>
        <SideBar navigation={navigation} setNavigation={setNavigation} />
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
            <div className="">
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
            </div>
          )}
          {navigation == "Favoris" && (
            <div>
              <h1>Favoris</h1>
              <Row>Favoris</Row>
            </div>
          )}
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
