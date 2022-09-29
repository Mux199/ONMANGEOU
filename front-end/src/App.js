import React, { useState } from "react";

import Main from "./pages/Main";
import NavBar from "./components/NavBar";
import { Routes, Route, Link } from "react-router-dom";
import Account from "./pages/Account";
import Connexion from "./pages/Connexion";
import UserProfil from "./pages/UserProfil";
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
        <Route path="*" element={<Main />} />
      </Routes>
    </div>
  );
};
