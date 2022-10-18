import {React, useEffect,useRef,useState} from "react";
import { AiOutlineUser } from "react-icons/ai";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

const styles = {
    display: 'flex',
    justifyContent: 'space-between'
}

export default function RestaurateurProfil(){
    return (
        <div className="restau-profil" style={styles}>
            
            <div className="restau-profil-content">
                Bienvenue sur cette page
            </div>
        </div>
    )
}