import React, { useContext } from "react";
import SideBar from "../components/SideBar";
import { DatePicker } from "reactstrap-date-picker";
import { useState } from "react";
import { Label } from "reactstrap";
import { UidContext } from "../AppContext";
import { Navigate } from "react-router-dom";


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
      <SideBar />
    </div>
  );
}
