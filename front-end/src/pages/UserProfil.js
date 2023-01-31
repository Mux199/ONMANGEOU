import React, { useContext } from "react";
import SideBar from "../components/SideBar";
import { Link } from "react-router-dom";
import {Row,Col} from "reactstrap";
import Table from '@mui/material/Table';
const styles = {
  display: "flex",
  justifyContent: "flex-start",
};

export default function UserProfil() {
  return (
    <div className="user-profil" style={styles}>
      <div>
      <SideBar />
      </div>
      <div>
        <Col className="position">
        <Table>

       
        <Link to={'/Book'} style={{ color: 'black', fontWeight:'bold'}} >
          <Row>
          Réserver un restaurant
          </Row>
        </Link>
        </Table>
        </Col>
      </div>
    </div>
  );
}
