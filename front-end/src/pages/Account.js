import React from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Account() {
  const [active, setActive] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [telephone, setTelephone] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    const nomError = document.querySelector(".nom.error");
    const prenomError = document.querySelector(".prenom.error");
    const telephoneError = document.querySelector(".telephone.error");
    const passewordConfirm = document.querySelector(".passewordConfirm.error");
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/login`,
      withCredentials: true,
      data: {
        email,
        password,
        nom,
        prenom,
        telephone,
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
          window.location = "/Connexion";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="account">
      <Form>
        <FormGroup>
          <Label htmlFor="nom">Nom</Label>
          <Input
            id="Nom"
            name="Nom"
            placeholder="Insérez votre nom"
            type="text"
          />
        </FormGroup>
        <FormGroup>
          <Label>Prénom</Label>
          <Input
            id="Prénom"
            name="Prénom"
            placeholder="Insérez votre prénom"
            type="text"
          />
        </FormGroup>
        <FormGroup>
          <Label>Téléphone</Label>
          <Input
            id="Télephone"
            name="Télephone"
            placeholder="Num Télephone"
            type="number"
          />
        </FormGroup>
        <FormGroup>
          <Label>Email</Label>
          <Input
            id="Email"
            name="Email"
            placeholder="Insérez votre mail"
            type="email"
          />
        </FormGroup>
        <FormGroup>
          <Label for="Mot de passe">Mot de Passe</Label>
          <Input
            id="Password"
            name="Mot de passe"
            placeholder="Insérez votre mot de passe"
            type="password"
          />
        </FormGroup>
        <div className="password error"></div>
        <FormGroup>
          <Label htmlFor="passewordConfirm">
            {" "}
            Confirmation du mot de passe
          </Label>
          <Input
            id="passewordConfirm"
            name="passewordConfirm"
            placeholder="Veuillez confirmer le mot de passe"
            type="passeword"
            onChange={(e) => setPasswordConfirm(e.target.value)}
            value={passwordConfirm}
          />
        </FormGroup>
        <div className="passwordConfirm error"></div>
        <FormGroup>
          <Label>Êtes vous un restaurateur?</Label>
          {!active && (
            <Button className="restaurant-y" onClick={() => setActive(true)}>
              Oui
            </Button>
          )}
        </FormGroup>
        {active && (
          <>
            <FormGroup>
              <Label>Numéro de Siret</Label>
              <Input
                id="SIRET"
                name="SIRET"
                placeholder="Indiquez le numéro de SIRET"
                type="number"
              />
            </FormGroup>
            <FormGroup>
              <Label>Spécialité</Label>
              <Input
                id="specialite"
                name="Spécialité"
                placeholder="Veuillez insérer votre spécialité"
                type="text"
              />
            </FormGroup>
            <FormGroup>
              <Label>Ville</Label>
              <Input
                id="city"
                name="Ville"
                placeholder="Veuillez insérer la ville dans laquelle vous vous situez"
                type="text"
              />
            </FormGroup>
            <FormGroup>
              <Label>Adresse du restaurant</Label>
              <Input
                id="Email"
                name="Email"
                placeholder="Veuillez insérer l'adresse du restaurant"
                type="text"
              />
            </FormGroup>
          </>
        )}
        <div>
          {/* <Link to={'/Connexion'} > */}
          <Button className="valid-btn">Valider votre inscription</Button>
          {/* </Link> */}
        </div>
      </Form>
    </div>
  );
}
