import React, { useContext, useState, useEffect } from "react";
import SideBar from "../components/SideBar";
import { UidContext } from "../components/AppContext";
import { Row, Col } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateTelephone } from "../store/reducers/actions/user.actions";
//import { cancelReservation } from "../store/reducers/actions/reservation.actions";
import { getUserResa } from "../store/reducers/actions/reservation.actions";
import Table_Reservation from "../components/TABLE_RESERVATION";

import { dateParser } from "../components/Utils";

const styles = {
  display: "flex",
  justifyContent: "flex-start",
};

export default function UserProfil() {
  const [uid, setUid] = useContext(UidContext);
  const dispatch = useDispatch();
  console.log("UidContext");
  console.log(UidContext);
  dispatch(getUserResa(uid._id));
  const userData = useSelector((state) => state.rootReducer.userReducer);
  const resaData = useSelector((state) => state.rootReducer.resaReducer);
  const restausData = useSelector((state) => state.rootReducer.restausReducer);
  const [myUserData, setMyUserData] = useState(userData);
  const [myResaData, setMyResaData] = useState(resaData);

  useEffect(() => {
    setMyUserData(userData.users);
  }, [userData.users]);

  if (myUserData && myUserData._id) {
    dispatch(getUserResa(myUserData._id));
  }

  useEffect(() => {
    setMyResaData(resaData);
  }, [resaData]);

  console.log(restausData);
  console.log(resaData);

  console.log("myResaData");
  console.log(myResaData);

  console.log("myUserData");
  console.log(myUserData);

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
  const [navigation, setNavigation] = useState("Réservations");
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
                    }}
                  />
                ) : (
                  <Table_Reservation data={[]} />
                )}
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
                <Col>{myUserData && myUserData.lastname}</Col>
              </Row>
              <Row>
                <Col>Prénom</Col>
              </Row>
              <Row>
                <Col>{myUserData && myUserData.firstname}</Col>
              </Row>
              <Row>
                <Col>Email</Col>
              </Row>
              <Row>
                <Col>{myUserData && myUserData.email}</Col>
              </Row>
              <Row className="telephone-update">
                <Col>Téléphone</Col>
              </Row>
              <Row>
                {updateForm == false && (
                  <>
                    <Col onClick={() => setUpdateForm(!updateForm)}>
                      {myUserData.telephone}
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
                        defaultValue={myUserData.telephone}
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
                <Col>
                  {myUserData && myUserData.createdAt
                    ? dateParser(myUserData.createdAt)
                    : ""}
                </Col>
              </Row>
            </Row>
          )}
          {navigation == "Favoris" && (
            <Row className="favorite">
              <h1>Favoris</h1>
              <Row>Favoris</Row>
              <Row>
                Nombre de favoris :{" "}
                {myUserData && myUserData.likes ? myUserData.likes.length : ""}
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
