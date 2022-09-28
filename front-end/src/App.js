import React, { useState } from "react";

import Main from "./components/Main";
import Book from "./components/Book";
import ThankYou from "./components/ThankYou";
import NavBar from "./components/NavBar";
import Search from "./components/Search";
import { Routes, Route, Link } from "react-router-dom";
import Account from "./components/Account";
import Connexion from "./components/Connexion";
export default (_) => {
  const [page, setPage] = useState(0);

  return (
    <div>
      <NavBar setPage={setPage} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="account" element={<Account />} />
        <Route path="connexion" element={<Connexion />} />
        <Route path="*" element={<Main />} />
      </Routes>
    </div>
  );
};
