import React, { useContext } from "react";
import SideBar from "../components/SideBar";
import { DatePicker } from "reactstrap-date-picker";
import { useState } from "react";
import { Link } from "react-router-dom";
import { UidContext } from "../AppContext";
import { Navigate } from "react-router-dom";
import {Row,Col} from "reactstrap";

const styles = {
  display: "flex",
  justifyContent: "space-between",
};

export default function UserProfil() {
  const uid = useContext(UidContext);
  console.log(uid);
  const ChooseDate = () => {
    const [startDate, setStartDate] = useState(new Date());
  };
  return (
    <div className="user-profil" style={styles}>
      {/* {uid == null ? <Navigate to="/connexion" /> : <SideBar />} */}
      <div>
      <SideBar />
      </div>
      <div>
        <Col className="position">
        <h1>Historique</h1>
        <Link to={'/Book'} style={{ color: 'black', fontWeight:'bold'}} >
          <Row>
          Pour réserver un restaurant
          </Row>
        </Link>
        </Col>


       
      </div>
    </div>
  );
}
