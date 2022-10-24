import React from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function SignUpUser() {
  const [active, setActive] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [telephone, setTelephone] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    const nomError = document.querySelector(".nom.error");
    const prenomError = document.querySelector(".prenom.error");
    const telephoneError = document.querySelector(".telephone.error");
    const passwordConfirmError = document.querySelector(
      ".passwordConfirm.error"
    );
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

    if (password != passwordConfirm) {
      passwordConfirmError.innerHTML =
        "les deux mots de passe ne correspondent pas";
    } else {
      passwordConfirmError.innerHTML = "";
      axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/user/register`,
        withCredentials: true,
        data: {
          email,
          password,
          firstname: nom,
          lastname: prenom,
          telephone,
          role: "user",
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.errors) {
            emailError.innerHTML = res.data.errors.email;
            passwordError.innerHTML = res.data.errors.password;
            nomError.innerHTML = res.data.errors.nom;
            prenomError.innerHTML = res.data.errors.prenom;
            telephoneError.innerHTML = res.data.errors.telephone;
          } else {
            window.location = "/userProfil";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className="signUpUser">
      <Form onSubmit={handleRegister}>
        <FormGroup>
          <Label htmlFor="nom">Nom</Label>
          <Input
            id="nom"
            name="nom"
            placeholder="Insérez votre nom"
            type="text"
            onChange={(e) => setNom(e.target.value)}
            value={nom}
          />
        </FormGroup>
        <div className="nom error"></div>
        <FormGroup>
          <Label htmlFor="prenom">Prénom</Label>
          <Input
            id="prenom"
            name="prenom"
            placeholder="Insérez votre prénom"
            type="text"
            onChange={(e) => setPrenom(e.target.value)}
            value={prenom}
          />
        </FormGroup>
        <div className="prenom error"></div>
        <FormGroup>
          <Label htmlFor="telephone">Téléphone</Label>
          <Input
            id="telephone"
            name="telephone"
            placeholder="Indiquez votre téléphone"
            type="text"
            onChange={(e) => setTelephone(e.target.value)}
            value={telephone}
          />
        </FormGroup>
        <div className="telephone error"></div>
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
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
            name="password"
            placeholder="Insérez votre mot de passe"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </FormGroup>
        <div className="password error"></div>
        <FormGroup>
          <Label htmlFor="passwordConfirm"> Confirmation du mot de passe</Label>
          <Input
            id="passwordConfirm"
            name="passwordConfirm"
            placeholder="Veuillez confirmer le mot de passe"
            type="password"
            onChange={(e) => setPasswordConfirm(e.target.value)}
            value={passwordConfirm}
          />
        </FormGroup>
        <div className="passwordConfirm error" />
        <div>
          <Button className="valid-btn" type="submit">
            Valider votre inscription
          </Button>
        </div>
      </Form>
    </div>
  );
}
