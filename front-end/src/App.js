import React, { useState } from "react";

import Main from "./pages/Main";
import NavBar from "./components/NavBar";
import { Routes, Route, Link } from "react-router-dom";
import Account from "./pages/Account";
import Connexion from "./pages/Connexion";
import UserProfil from "./pages/UserProfil";
import Logout from "./pages/Logout";
import Faq from "./pages/Faq";
import RestaurateurProfil from "./pages/RestaurateurProfil";
export default (_) => {
  const [page, setPage] = useState(0);

  return (
    <div>
      <NavBar setPage={setPage} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="account" element={<Account />} />
        <Route path="connexion" element={<Connexion />} />
        <Route path="userProfil" element={<UserProfil />} />
        <Route path="logout" element={<Logout />} />
        <Route path="faq" element={<Faq />} />
        <Route path="restaurateurProfil" element={<RestaurateurProfil />} />
        <Route path="*" element={<Main />} />
      </Routes>
    </div>
  );
};
