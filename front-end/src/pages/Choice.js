import React from "react";
import {SiCodechef} from "react-icons/si";
import {AiOutlineUser} from "react-icons/ai";
import {Link} from "react-router-dom";
import { Menu, MenuItem } from "react-pro-sidebar";

export default function Choice() {
    return (
        <div className="choice">
            <Menu iconShape="square" >
                <MenuItem icon={<AiOutlineUser/>}>
                    <Link to={'/signUpUser'} style={{ color: 'black', fontWeight:'bold'}}>
                        Vous êtes client
                    </Link>
                    </MenuItem>
                <MenuItem icon= {<SiCodechef/>}>
                    <Link to={'/signUpPro'} style={{ color: 'black', fontWeight:'bold'}} >
                        Vous êtes restaurateur
                    </Link>
                </MenuItem>
            
            </Menu>     
        </div>
    )

}

