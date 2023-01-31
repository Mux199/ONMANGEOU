import React, { useState } from "react";

import Main from "./pages/Main";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import Connexion from "./pages/Connexion";
import UserProfil from "./pages/UserProfil";
import Logout from "./pages/Logout";
import Faq from "./pages/Faq";
import Footer from "./components/Footer";
import Book from "./pages/Book";
import Choice from "./pages/Choice";
import SignUpUser from "./pages/SignUpUser";
import SignUpPro from "./pages/SignUpPro";
import ProProfil from "./pages/ProProfil";
import Table from "./pages/Table";



const App = () => {
  const [setPage] = useState(0);

  return (
    <div>
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
        <Route path="proProfil" element={<ProProfil /> } />
        <Route path="table" element={<Table /> } />
      </Routes>
      <Footer />
    </div>
  );
}
export default App
