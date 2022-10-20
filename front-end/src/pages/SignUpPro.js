import {React, useEffect,useRef,useState} from "react";
import { Form, FormGroup, Label, Input, Button, Dropdown, DropdownMenu, DropdownItem } from "reactstrap";
import {Link} from "react-router-dom";
import axios from "axios";
const styles = {
    justifyContent: 'space-between'
}

export default function SignUpPro(){
    const [active, setActive] = useState(false);
    const [activeW, setActiveW] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [telephone, setTelephone] = useState("");
    const showPrice =() =>{
      setActive(true);
    }
    const hidePrice=() =>{
      setActive(false);
    }
    const showWaiting =() =>{
      setActiveW(true);
    }
    const hideWaiting=() =>{
      setActiveW(false);
    }


    const handleRegister= (e) => {
        e.preventDefault();
        const emailError = document.querySelector(".email.error");
        const passwordError = document.querySelector(".password.error");
        const nomError = document.querySelector(".nom.error");
        const prenomError = document.querySelector(".prenom.error");
        const telephoneError = document.querySelector(".telephone.error");
        const passewordConfirm = document.querySelector(".passewordConfirm.error");
        axios( {
          method: "post",
          url:`${process.env.REACT_APP_API_URL}api/user/register`,
          withCredentials: true,
          data: {
            email,
            password,
            nom,
            prenom,
            telephone
      
          }
        })
        .then((res) => {
          console.log(res);
          if (res.data.errors) {
            emailError.innerHTML = res.data.errors.email;
            passwordError.innerHTML = res.data.errors.password;
            nomError.innerHTML = res.data.errors.nom;
            prenomError.innerHTML = res.data.errors.prenom;
            telephoneError.innerHTML= res.data.errors.telephone;
      
          } else {
            window.location = "/Connexion";
          }
        })
        .catch((err) => {
          console.log(err);
        });
      };
    return (
     <div className="restau-profil" style={styles}> 
        <Form onSubmit={handleRegister}>
            <FormGroup>
            <Label htmlFor="nom">
                Nom
            </Label>
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
            type="number"
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
          <Label htmlFor="passeword">Mot de Passe</Label>
          <Input
            id="passeword"
            name="passeword"
            placeholder="Insérez votre mot de passe"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </FormGroup>
        <div className="password error"></div>
        <FormGroup>
          <Label htmlFor="passewordConfirm"> Confirmation du mot de passe</Label>
          <Input
            id="passewordConfirm"
            name="passewordConfirm"
            placeholder="Veuillez confirmer le mot de passe"
            type="password"
            onChange={(e) => setPasswordConfirm(e.target.value)}
            value={passwordConfirm}
         />
        </FormGroup>
        <div className="passwordConfirm error"></div>
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
        <FormGroup>
              <Label>Numéro de Siret</Label>
              <Input
                id="SIRET"
                name="SIRET"
                placeholder="Indiquez le numéro de SIRET"
                type="number"
              />
        </FormGroup>

        <div className="dropdown">
            <div className="dropdown-btn" onClick={e =>setActive(!active)}>
              Fourchette de Prix
              <span className="fast"></span>
            </div>
            {active && (
              <div className="dropdown-content">
                <div className="dropdown-item">Pas cher</div>
                <div className="dropdown-item">Moyen</div>
                <div className="dropdown-item">Cher</div>
              </div>
            
            )
          }
          </div>
     

           
            
             
            {/* <Dropdown.Item>Pas cher</Dropdown.Item>
            <Dropdown.Item>Moyen</Dropdown.Item>
            <Dropdown.Item>Cher</Dropdown.Item> */}
          
      
        <FormGroup>
       
            <Label>Temps d'attente</Label>
            
            {/* <Dropdown.Item>Rapide</Dropdown.Item>
            <Dropdown.Item>Moyen</Dropdown.Item>
            <Dropdown.Item>Lent</Dropdown.Item> */}
          
        </FormGroup>
        <div>
         <Link to={"/ProProfil"}>
            <Button className="valid-btn" type="submit">
            Valider votre inscription
            </Button>
        </Link> 
        </div>
      </Form>
    </div>
        
    )
}