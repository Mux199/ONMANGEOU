import {React} from "react";
import SideBar from "../components/SideBar"


const styles = {
    display: 'flex',
    justifyContent: 'space-between'
}

 export default function UserProfil(){
    return (
        <div className="user-profil" style={styles}>
             <SideBar/> 
            <div className="user-profil-content">
            </div>
        </div>
    )
}

