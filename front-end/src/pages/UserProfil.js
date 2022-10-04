import {React, useEffect,useRef,useState} from "react";
import { AiOutlineUser } from "react-icons/ai";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";



import SideBar from "../components/SideBar"

const styles = {
    display: 'flex',
    justifyContent: 'space-between'
}

 export default function UserProfil(){
    return (
        
        
        <div className="user-profil" style={styles}>
                <SideBar />
            <div className="user-profil-content">

                
            </div>
        </div>
    )
}



export default UserProfil
