//import useState hook to create menu collapse state
import React, { useState } from "react";
import { Link } from "react-router-dom";
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
import { FaList } from "react-icons/fa";
import {
  FiHome,
  FiLogOut,
  FiArrowLeftCircle,
  FiArrowRightCircle,
} from "react-icons/fi";
import { BiCog } from "react-icons/bi";
import { AiOutlineHistory } from "react-icons/ai";

import "react-pro-sidebar/dist/css/styles.css";
import "../styles/components/SideBar.scss";

const Sidebar = (props) => {
  const [menuCollapse, setMenuCollapse] = useState(false);
  const { navigation, setNavigation } = props;

  const menuIconClick = () => {
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  const handleMessage = (event) => {
    console.log(event.target.closest("span").innerHTML);
    const closetSpan = event.target.closest("span").innerHTML;
    setNavigation(closetSpan);
  };

  const handleClick = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <div id="sideBar">
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
            <div className="logotext">
              {menuCollapse ? "Mon profil" : "Mon profil"}
            </div>
            <div className="closemenu" onClick={menuIconClick}>
              {menuCollapse ? <FiArrowRightCircle /> : <FiArrowLeftCircle />}
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              <MenuItem icon={<FiHome />}>
                {/* <Link to={'/'} style={{ color: 'black', fontWeight:'bold'}}> */}
                <a href="/"></a>
                Accueil
                {/* </Link> */}
              </MenuItem>
              <div>
                <MenuItem onClick={handleMessage} icon={<FaList />}>
                  Réservation
                </MenuItem>
              </div>
              <MenuItem icon={<BiCog />} onClick={handleMessage}>
                Informations personnelles
              </MenuItem>

              <MenuItem icon={<AiOutlineHistory />} onClick={handleMessage}>
                Historique
              </MenuItem>
            </Menu>
          </SidebarContent>
          <SidebarFooter onClick={handleClick}>
            <Menu iconShape="square">
              <MenuItem icon={<FiLogOut />}>
                <Link
                  to={"/logout"}
                  style={{ color: "black", fontWeight: "bold" }}
                >
                  Se déconnecter
                </Link>
              </MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
    </>
  );
};

export default Sidebar;
