
//import useState hook to create menu collapse state
import React, { useState } from "react";
import Button from "reactstrap";
import {Link} from "react-router-dom";
import Logout from "./Logout";
//import react pro sidebar components
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

//import icons from react icons
import { FaList, FaRegHeart } from "react-icons/fa";
import { FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";


//import sidebar css from react-pro-sidebar module and our custom css 
import "react-pro-sidebar/dist/css/styles.css";
import "../styles/pages/SideBar.css";
import { ButtonToolbar } from "reactstrap";


const SideBar = () => {
  
    //create initial menuCollapse state using useState hook
    const [menuCollapse, setMenuCollapse] = useState(false)

    //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  return (
    <>
      <div id="sideBar">
          {/* collapsed props to change menu size using menucollapse state */}
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
          <div className="logotext">
              {/* small and big change using menucollapse state */}
              {menuCollapse ? "Logo" : "Mon profil"}
            </div>
            <div className="closemenu" onClick={menuIconClick}>
                {/* changing menu collapse icon on click */}
              {menuCollapse ? (
                <FiArrowRightCircle/>
              ) : (
                <FiArrowLeftCircle/>
              )}
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              <MenuItem active={true} icon={<FiHome />}>
                Accueil
              </MenuItem>  
              <MenuItem icon={<FaList />}>Informations personnelles</MenuItem>
              {/* <MenuItem icon={<FaRegHeart />}>Favourite</MenuItem> */}
             
              <MenuItem icon={<BiCog />}>Paramètres</MenuItem>
            </Menu>
          </SidebarContent>
          <SidebarFooter>
                <Menu iconShape="square">
                 <Link to={'../logout'}> 
                    <MenuItem icon={<FiLogOut />}>
                    Se déconnecter
                    </MenuItem>
                 </Link> 
                </Menu>

          </SidebarFooter>
        </ProSidebar>
      </div>
    </>
  );
};

export default SideBar;
