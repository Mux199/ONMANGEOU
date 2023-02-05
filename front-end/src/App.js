import React, { useState, useEffect } from "react";
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
import { UidContext } from "./components/AppContext";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "./store/reducers/actions/user.actions";

export default (_) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);

  const [context, setContext] = useState({
    uid: { _id: null, role: "" },
    setUid: (newUid) =>
      setContext((prevState) => ({
        ...prevState,
        uid: newUid,
      })),
  });

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
      })
        .then((res) => {
          console.log("dans use effect de APP : ");
          console.log(res.data);
          setContext({ _id: res.data._id, role: res.data.role });
        })
        .catch((err) => console.log("No token"));
    };
    fetchToken();
    console.log("On est dans APP");
    console.log(context._id);
    console.log(context);

    if (context._id) {
      console.log("avant dispatch de app");
      dispatch(getUser(context._id));
      console.log("après dispatch de app");
    }
  }, [context._id, dispatch]);

  return (
    <UidContext.Provider value={[context, setContext]}>
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
          <Route path="proProfil" element={<ProProfil />} />
        </Routes>
        <Footer />
      </div>
    </UidContext.Provider>
  );
};
