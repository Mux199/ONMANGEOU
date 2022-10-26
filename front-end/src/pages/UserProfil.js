import React, { useContext } from "react";
import SideBar from "../components/SideBar";
import { useState } from "react";
import { Link } from "react-router-dom";
import { UidContext } from "../AppContext";
import {Row,Col} from "reactstrap";

const styles = {
  display: "flex",
  justifyContent: "flex-start",
};

export default function UserProfil() {
  const uid = useContext(UidContext);
  console.log(uid);
  const ChooseDate = () => {
    const [startDate, setStartDate] = useState(new Date());
  };
  return (
    <div className="user-profil" style={styles}>
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
