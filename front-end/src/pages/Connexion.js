import React, { useState, useContext } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import axios from "axios";
import { UidContext } from "../components/AppContext";
import { formHelperTextClasses } from "@mui/material";

export default function Connexion() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //const [{ uid, setUid }, setContext] = useContext(UidContext);
  const [uid, setUid] = useContext(UidContext);

  const handleLogin = (e) => {
    e.preventDefault();
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    axios.defaults.headers.post["Access-Control-Allow-Origin"] =
      "http://localhost:3000";
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/login`,
      withCredentials: true,
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        console.log("res");
        console.log(res);
        console.log("res.data.errors)");
        console.log(res.data.errors);
        if (res.data.errors) {
          emailError.innerHTML = res.data.errors.email;
          passwordError.innerHTML = res.data.errors.password;
        } else {
          setUid({ _id: res.data._id, role: res.data.role });
          if (res.data._id) {
            switch (res.data.role) {
              case "user":
                console.log("user");
                window.location = "/userProfil";
                break;
              case "professional":
                console.log("professional");
                window.location = "/proProfil";
                break;
              case "admin":
                window.location = "/adminProfil";
                break;
              default:
                console.log("connexion");
                window.location = "/connexion";
            }
          }
        }
      })
      .catch((err) => {
        console.log("err");
        if (err.response && err.response.data && err.response.data.errors) {
          emailError.innerHTML = err.response.data.errors.email;
          passwordError.innerHTML = err.response.data.errors.password;
        }
        console.log(err);
      });
  };
  return (
    <div className="connexion">
      <Form onSubmit={handleLogin}>
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="Email"
            placeholder="Insérez votre mail"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </FormGroup>
        <div className="email error"></div>
        <FormGroup>
          <Label htmlFor="password">Mot de Passe</Label>
          <Input
            id="password"
            name="Mot de passe"
            placeholder="Insérez votre mot de passe"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </FormGroup>
        <div className="password error"></div>
        <Button className="valid-btn" type="submit">
          Valider
        </Button>
      </Form>
    </div>
  );
}
