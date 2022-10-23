import {React} from "react";
import SideBar from "../components/SideBar"
import { DatePicker } from "reactstrap-date-picker";
import { useState } from "react";
import { Label } from "reactstrap";
const styles = {
    display: 'flex',
    justifyContent: 'space-between'
}

 export default function ProProfil(){
    const ChooseDate = () => {
        const [startDate, setStartDate] = useState(new Date());
    }
    return (
        <div className="pro-profil" style={styles}>
             <SideBar/>                
 
        </div>
    )
}


