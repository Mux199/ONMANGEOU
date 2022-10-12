import React from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useState } from "react";
import {Link} from "react-router-dom";
import axios from "axios";

export default function Account() {
  const [active, setActive] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");

const handleLogin= (e) => {
  e.preventDefault();
  const emailError = document.querySelector(".email.error");
  const passwordError = document.querySelector(".password.error");
  const nomError = document.querySelector(".nom.error");
  const prenomError = document.querySelector(".prenom.error");


  axios( {
    method: "post",
    url:`${process.env.REACT_APP_API_URL}api/user/login`,
    withCredentials: true,
    data: {
      email,
      password,
      nom,
      prenom,
    }

  })
  .then((res) => {
    console.log(res);
    if (res.data.errors) {
      emailError.innerHTML = res.data.errors.email;
      passwordError.innerHTML = res.data.errors.password;
      nomError.innerHTML = res.data.erros.nom;
      prenomError.innerHTML = res.data.erros.prenom;

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
      <Form onSubmit={handleLogin}>
        <FormGroup>
          <Label htmlFor="nom">
            Nom
          </Label>
          <Input
            id="Nom"
            name="Nom"
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
            id="Prénom"
            name="Prénom"
            placeholder="Insérez votre prénom"
            type="text"
            onChange={(e) => setPrenom(e.target.value)}
            value={prenom}
          />
        </FormGroup>
        <div className="prenom error"></div>
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
          <Label htmlFor="email">Email</Label>
          <Input
            id="Email"
            name="Email"
            placeholder="Insérez votre mail"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </FormGroup>
        <div className="email error"></div>
        <FormGroup>
          <Label htmlFor="Mot de passe">Mot de Passe</Label>
          <Input
            id="Password"
            name="Mot de passe"
            placeholder="Insérez votre mot de passe"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </FormGroup>
        <div className="password error"></div>
        <FormGroup>
          <Label>Êtes vous un restaurateur?</Label>
          {!active && (
            <Button className="restaurant-y" 
            onClick={() => setActive(true)}>
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
                id="Adresse"
                name="Adresse"
                placeholder="Veuillez insérer l'adresse du restaurant"
                type="text"
              />
            </FormGroup>
          </>
        )}
        <div>
          <Link to={'/Connexion'} >
          <Button className="valid-btn">
            Valider votre inscription
          </Button>
          </Link>
        </div>
      </Form>
    </div>
 
 );
}
