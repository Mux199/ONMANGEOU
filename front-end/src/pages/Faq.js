import React from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import {Link} from "react-router-dom";

export default function Faq() {
    return (
        <div className="faq">
            <h1 className="titre">Nous sommes là pour vous aider</h1>
            <h3>Question 1: Comment s'inscrire ?</h3>
                <h4 className="sous2-titre">Cliquer sur le bouton Créer un compte</h4>
            <h3>Question 2: Mes données personnelles sont-elles conservées?</h3>
                <h4> Seules les données nécessaires sont conservées dans le but de vous informer les nouvelles.</h4>
            <h3>Question 3: Supprimer une réservation est-il possible?</h3>
                <h4>Oui, cela est tout à fait possible</h4>
            
        </div>
        
    )


} 