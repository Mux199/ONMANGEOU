import React from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import {Link} from "react-router-dom";
export default function Connexion() {
  return (
    <div className="connexion">
      <Form>
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
        <Link to={'/userProfil'}>
        <Button className="valid-btn">
          Valider
          </Button>
        </Link>
      </Form>
    </div>
  );
}
