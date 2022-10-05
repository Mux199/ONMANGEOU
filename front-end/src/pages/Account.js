import React from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useState } from "react";
import {Link} from "react-router-dom";


export default function Account() {
  const [active, setActive] = useState(false);
  return (
    <div className="account">
      <Form>
        <FormGroup>
          <Label>
            Nom
          </Label>
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
          <Link to={'/userProfil'} >
          <Button className="valid-btn">Valider votre inscription</Button>
          </Link>
        </div>
      </Form>
    </div>
 
 );
}
