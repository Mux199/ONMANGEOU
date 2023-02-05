import { React, useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import axios from "axios";
const styles = {
  justifyContent: "space-between",
};

export default function SignUpPro() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [telephone, setTelephone] = useState("");

  const [restaurantName, setRestaurantName] = useState("");
  const [speciality, setSpeciality] = useState("japonais");
  const [price, setPrice] = useState("moyen");
  const [waiting, setWaiting] = useState("rapide");
  const [restaurantDescription, setRestaurantDescription] = useState("");
  const [adresse, setAdresse] = useState("");
  const [city, setCity] = useState("");
  const [siret, setSiret] = useState("");
  const [telephoneRestaurant, setTelephoneRestaurant] = useState("");

  const [postalCode, setPostalCode] = useState("");
  const [rows, setRows] = useState(1);
  const [cols, setCols] = useState(1);
  const [matrix, setMatrix] = useState(() => {
    var Matrix = [];
    for (var y = 0; y < rows; y++) {
      Matrix[y] = [];
      for (var x = 0; x < cols; x++) {
        Matrix[y][x] = 1;
      }
    }
    return Matrix;
  });

  const [nbplaces, setnbplaces] = useState(1);

  const weekdays = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche",
  ];
  const [selectedWeekdays, setSelectedWeekdays] = useState([]);

  const handleCheckboxChange = (e) => {
    const weekday = e.target.value;
    if (selectedWeekdays.includes(weekday)) {
      setSelectedWeekdays(selectedWeekdays.filter((d) => d !== weekday));
    } else {
      setSelectedWeekdays([...selectedWeekdays, weekday]);
    }
  };

  const handleSpecialityChange = (event) => {
    setSpeciality(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleWaitingChange = (event) => {
    setWaiting(event.target.value);
  };

  const sumElements = (matrix) => {
    let sum = 0;
    matrix.forEach((row) => {
      row.forEach((element) => {
        sum += element;
      });
    });
    return sum;
  };

  function handleChangeRow(event) {
    setRows(event.target.value);
    var Matrix = [];
    for (var y = 0; y < event.target.value; y++) {
      Matrix[y] = [];
      for (var x = 0; x < cols; x++) {
        Matrix[y][x] = 1;
      }
    }
    setMatrix(Matrix);
  }

  function handleChangeCol(event) {
    setCols(event.target.value);
    var Matrix = [];
    for (var y = 0; y < rows; y++) {
      Matrix[y] = [];
      for (var x = 0; x < event.target.value; x++) {
        Matrix[y][x] = 1;
      }
    }
    setMatrix(Matrix);
  }
  function handleChange(e, i, j) {
    var updatedMatrix = [];
    updatedMatrix = matrix.slice();
    updatedMatrix[i][j] = Number(e.target.value);
    setMatrix(updatedMatrix);
  }

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("handleRegister");
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    const firstnameError = document.querySelector(".firstname.error");
    const lastnameError = document.querySelector(".lastname.error");
    const telephoneError = document.querySelector(".telephone.error");
    const restaurantDescriptionError = document.querySelector(
      ".restaurantDescription.error"
    );
    const restaurantNameError = document.querySelector(".restaurantName.error");
    const matrixError = document.querySelector(".matrix.error");
    const nbplacesError = document.querySelector(".nbplaces.error");
    const siretError = document.querySelector(".siret.error");
    const cityError = document.querySelector(".city.error");
    const adresseError = document.querySelector(".adresse.error");
    const weekdayError = document.querySelector(".weekday.error");

    const postalCodeError = document.querySelector(".postalCode.error");
    const telephoneRestaurantError = document.querySelector(
      ".telephoneRestaurant.error"
    );

    const passwordConfirmError = document.querySelector(
      ".passwordConfirm.error"
    );
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

    let errors = false;

    if (password != passwordConfirm) {
      passwordConfirmError.innerHTML =
        "les deux mots de passe ne correspondent pas";
      errors = true;
    } else {
      passwordConfirmError.innerHTML = "";
    }
    if (restaurantDescription.length < 5) {
      restaurantDescriptionError.innerHTML =
        "la description est trop courte < 5";
      errors = true;
    } else if (restaurantDescription.length > 250) {
      restaurantDescriptionError.innerHTML =
        "la description est trop longue > 250";
      errors = true;
    } else {
      restaurantDescriptionError.innerHTML = "";
    }
    const sumMatrix = sumElements(matrix);

    if (sumMatrix != nbplaces) {
      matrixError.innerHTML =
        "Le nombre de place ( " +
        nbplaces +
        " ) est different de la somme des places du tableau (" +
        sumMatrix +
        " )";
      nbplacesError.innerHTML =
        "Le nombre de place ( " +
        nbplaces +
        " ) est different de la somme des places du tableau (" +
        sumMatrix +
        " )";
      errors = true;
    } else {
      matrixError.innerHTML = "";
      nbplacesError.innerHTML = "";
    }

    if (nbplaces < 1 || nbplaces > 400) {
      nbplacesError.innerHTML = "Le nombre de place est compris entre 1 et 400";
      errors = true;
    } else {
      nbplacesError.innerHTML = "";
    }

    if (restaurantName.length < 2 || restaurantName.length > 30) {
      restaurantNameError.innerHTML =
        "Le nom du restaurant doit être compris entre 2 et 30 caractères";
      errors = true;
    } else {
      restaurantNameError.innerHTML = "";
    }

    if (adresse.length < 2 || adresse.length > 50) {
      adresseError.innerHTML =
        "L'adresse du restaurant doit être compris entre 2 et 50 caractères";
      errors = true;
    } else {
      adresseError.innerHTML = "";
    }

    if (city.length < 2 || city.length > 40) {
      cityError.innerHTML =
        "La ville du restaurant doit être compris entre 2 et 40 caractères";
      errors = true;
    } else {
      cityError.innerHTML = "";
    }

    if (!/^\d{5}$/.test(postalCode)) {
      postalCodeError.innerHTML = "Erreur format du code postal";
      errors = true;
    } else {
      postalCodeError.innerHTML = "";
    }

    if (
      !/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/.test(telephone) ||
      telephone.length < 10 ||
      telephone.length > 15
    ) {
      telephoneError.innerHTML = "Erreur format du telephone";
      errors = true;
    } else {
      telephoneError.innerHTML = "";
    }

    if (
      !/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/.test(
        telephoneRestaurant
      ) ||
      telephoneRestaurant.length < 10 ||
      telephoneRestaurant.length > 15
    ) {
      telephoneRestaurantError.innerHTML = "Erreur format telephone";
      errors = true;
    } else {
      telephoneRestaurantError.innerHTML = "";
    }
    if (!/^\d{14}$/.test(siret)) {
      siretError.innerHTML = "Erreur format siret";
      errors = true;
    } else {
      siretError.innerHTML = "";
    }

    if (selectedWeekdays.length == 0) {
      weekdayError.innerHTML =
        "Il faut selectionner au moins 1 jour d'ouverture";
    } else {
      weekdayError.innerHTML = "";
    }

    if (!errors) {
      passwordConfirmError.innerHTML = "";
      axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/user/register`,
        withCredentials: true,
        data: {
          email,
          password,
          firstname,
          lastname,
          telephone,
          role: "professional",
          telephone,
          cols,
          rows,
          type: speciality,
          priceRange: price,
          waiting,
          places: matrix,
          postalCode,
          adresse,
          nbplaces,
          weekdays: selectedWeekdays,
          city,
          siret,
          description: restaurantDescription,
          name: restaurantName,
          telephoneRestaurant,
        },
      })
        .then((res) => {
          if (res.data.errors) {
            emailError.innerHTML = res.data.errors.email;
            passwordError.innerHTML = res.data.errors.password;
            lastnameError.innerHTML = res.data.errors.lastname;
            firstnameError.innerHTML = res.data.errors.firstname;
            telephoneError.innerHTML = res.data.errors.telephone;
          } else {
            window.location = "/connexion";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className="signUpPro" style={styles}>
      <div className="owner">Propriétaire du Restaurant : </div>
      <Form onSubmit={handleRegister}>
        <FormGroup>
          <Label htmlFor="lastname">Nom</Label>
          <Input
            id="lastname"
            name="lastname"
            placeholder="Insérez votre nom"
            type="text"
            onChange={(e) => setLastName(e.target.value)}
            value={lastname}
          />
        </FormGroup>
        <div className="lastname error"></div>
        <FormGroup>
          <Label htmlFor="firstname">Prénom</Label>
          <Input
            id="firstname"
            name="firstname"
            placeholder="Insérez votre prénom"
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstname}
          />
        </FormGroup>
        <div className="firstname error"></div>
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
        <div className="passwordConfirm error"></div>
        <div className="restaurant">Informations du Restaurant : </div>
        <FormGroup>
          <Label htmlFor="restaurantName">Nom du Restaurant</Label>
          <Input
            id="restaurantName"
            name="restaurantName"
            placeholder="Insérez le nom du restaurant"
            type="text"
            onChange={(e) => setRestaurantName(e.target.value)}
            value={restaurantName}
          />
        </FormGroup>
        <div className="restaurantName error"></div>

        <FormGroup>
          <Label> Selectionner une specialité </Label>
          <Input
            value={speciality}
            type="select"
            name="speciality"
            id="speciality"
            onChange={handleSpecialityChange}
          >
            <option>japonais</option>
            <option>français</option>
            <option>americain</option>
            <option>italien</option>
            <option>chinois</option>
            <option>indien</option>
            <option>ethiopien</option>
          </Input>
        </FormGroup>
        <div className="speciality error"></div>

        <FormGroup>
          <Label htmlFor="restaurantDescription">
            Description du Restaurant
          </Label>
          <Input
            id="restaurantDescription"
            name="restaurantDescription"
            placeholder="Insérez la description du restaurant"
            type="text"
            onChange={(e) => setRestaurantDescription(e.target.value)}
            value={restaurantDescription}
          />
        </FormGroup>
        <div className="restaurantDescription error"></div>
        <FormGroup>
          <Label>Jours d'ouverture du restaurant</Label>
          {weekdays.map((weekday) => (
            <Label key={weekday}>
              <Input
                type="checkbox"
                value={weekday}
                checked={selectedWeekdays.includes(weekday)}
                onChange={handleCheckboxChange}
              />
              {weekday}
            </Label>
          ))}
          <br />
          <p>Selected weekdays: {selectedWeekdays.join(", ")}</p>
        </FormGroup>
        <div className="weekday error"></div>
        <FormGroup>
          <Label>Adresse du restaurant</Label>
          <Input
            id="adresse"
            name="adresse"
            placeholder="Veuillez insérer l'adresse du restaurant ex : 45 rue de la pepinière"
            type="text"
            value={adresse}
            onChange={(e) => setAdresse(e.target.value)}
          />
        </FormGroup>
        <div className="adresse error"></div>

        <FormGroup>
          <Label>Ville</Label>
          <Input
            id="city"
            name="city"
            placeholder="Veuillez insérer la ville du restaurant"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </FormGroup>
        <div className="city error"></div>

        <FormGroup>
          <Label>Code postal</Label>
          <Input
            id="postalCode"
            name="postalCode"
            placeholder="Veuillez insérer le code postal de l'adresse du restaurant"
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </FormGroup>
        <div className="postalCode error"></div>

        <FormGroup>
          <Label>Numéro de Siret</Label>
          <Input
            id="siret"
            name="siret"
            placeholder="Indiquez le numéro de SIRET"
            type="text"
            value={siret}
            onChange={(e) => setSiret(e.target.value)}
          />
        </FormGroup>
        <div className="siret error"></div>
        <FormGroup>
          <Label htmlFor="telephoneRestaurant">Téléphone du restaurant</Label>
          <Input
            id="telephoneRestaurant"
            name="telephoneRestaurant"
            placeholder="Indiquez le téléphone du restaurant"
            type="text"
            onChange={(e) => setTelephoneRestaurant(e.target.value)}
            value={telephoneRestaurant}
          />
        </FormGroup>
        <div className="telephoneRestaurant error"></div>
        <FormGroup>
          <Label> Critère de Prix</Label>
          <Input
            value={price}
            type="select"
            name="price"
            id="price"
            onChange={handlePriceChange}
          >
            <option>pas cher</option>
            <option>moyen</option>
            <option>cher</option>
          </Input>
        </FormGroup>
        <div className="price error"></div>
        <FormGroup>
          <Label>Temps d'attente</Label>
          <Input
            value={waiting}
            onChange={handleWaitingChange}
            type="select"
            name="waiting"
            id="waiting"
          >
            <option>rapide</option>
            <option>moyen</option>
            <option>long</option>
          </Input>
        </FormGroup>
        <div className="waiting error"></div>
        <FormGroup>
          <Label>Nombre de place</Label>
          <Input
            value={nbplaces}
            onChange={(e) => setnbplaces(e.target.value)}
            type="number"
            min="1"
            max="400"
            name="nbplaces"
            id="nbplaces"
          ></Input>
        </FormGroup>
        <div className="nbplaces error"></div>
        <FormGroup>
          <Label>Nombre de rangée(lignes)</Label>
          <Input
            type="number"
            name="rows"
            min="1"
            max="20"
            value={rows}
            onChange={handleChangeRow}
          ></Input>
        </FormGroup>
        <div className="rows error"></div>

        <FormGroup>
          <Label>Nombre de rangée(colonnes)</Label>
          <Input
            type="number"
            name="cols"
            min="1"
            max="20"
            value={cols}
            onChange={handleChangeCol}
          ></Input>
        </FormGroup>
        <div className="cols error"></div>
        <FormGroup>
          <table>
            <tbody>
              {Array.from({ length: rows }, (_, i) => (
                <tr key={i}>
                  {Array.from({ length: cols }, (_, j) => (
                    <td key={j}>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        onChange={(e) => handleChange(e, i, j)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </FormGroup>
        <div className="matrix error"></div>
        <div>
          <Button className="valid-btn" type="submit">
            Valider votre inscription
          </Button>
        </div>
      </Form>
    </div>
  );
}
