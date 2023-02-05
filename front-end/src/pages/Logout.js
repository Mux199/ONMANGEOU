import { React, useState } from "react";
import { Row, Col } from "reactstrap";
import axios from "axios";
import cookie from "js-cookie";

export default (_) => {
  const [logoutMessage, setLogoutMessage] = useState("Deconnexion...");
  const removeCookie = (key) => {
    if (window !== "undefined") {
      cookie.remove(key, { expires: 1 });
    }
  };
  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

  console.log(`${process.env.REACT_APP_API_URL}api/user/logout`);
  const logout = async () => {
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/user/logout`,
      withCredentials: true,
    })
      .then(() => {
        removeCookie("jwt");
        setLogoutMessage("Vous êtes bien déconnecté");
      })
      .catch((err) => {
        console.log("err");
        console.log(err);
        setLogoutMessage("Erreur deconnexion");
      });
    window.location = "/";
  };
  logout();
  return <div className="logout">{logoutMessage}</div>;
};
