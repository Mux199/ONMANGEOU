import React from 'react'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'
export default function Connection() {
    return(
        <Form>
            <FormGroup>
                <Label>
                    Email
                </Label>
                <Input
                    id="Email"
                    name="Email"
                    placeholder="Insérez votre mail"
                    type="email"
                 />
            </FormGroup>
            <FormGroup>
            <Label for="Mot de passe">
            Mot de Passe
            </Label>
            <Input
            id="Password"
            name="Mot de passe"
            placeholder="Insérez votre mot de passe"
            type="password"
            />
        </FormGroup>
        <Button
        color="primary">
        Valider
        </Button>
        </Form>
        
    ) 

}