import React, { useEffect, useState } from "react";

import Main from "./pages/Main";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import Account from "./pages/Account";
import Connexion from "./pages/Connexion";
import UserProfil from "./pages/UserProfil";
import Logout from "./pages/Logout";
import Faq from "./pages/Faq";
import RestaurateurProfil from "./pages/RestaurateurProfil";
import Footer from "./components/Footer";
import Book from "./pages/Book";
import Choice from "./pages/Choice";
import SignUpUser from "./pages/SignUpUser";
import SignUpPro from "./pages/SignUpPro";
import ProProfil from "./pages/ProProfil";
import { UidContext } from "./AppContext";
import axios from "axios";

export default (_) => {
  const [page, setPage] = useState(0);
  const [uid, setUid] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
      })
        .then((res) => setUid(res.data))
        .catch((err) => console.log("no token"));
    };
    fetchToken();
  }, [uid]);

  return (
    <div>
      <UidContext.Provider value={uid}>
        <NavBar setPage={setPage} />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="signUpUser" element={<SignUpUser />} />
          <Route path="connexion" element={<Connexion />} />
          <Route path="userProfil" element={<UserProfil />} />
          <Route path="logout" element={<Logout />} />
          <Route path="faq" element={<Faq />} />
          <Route path="signUpPro" element={<SignUpPro />} />
          <Route path="book" element={<Book />} />
          <Route path="*" element={<Main />} />
          <Route path="choice" element={<Choice />} />
          <Route path="proProfil" element={<ProProfil />} />
        </Routes>
        <Footer />
      </UidContext.Provider>
    </div>
  );
};
