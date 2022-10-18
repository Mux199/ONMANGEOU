module.exports.signUpErrors = (err) => {
  let errors = { email: "", password: "", nom: "", prenom: "", telephone: "" };

  if (err.message.includes("email")) errors.email = "Email inconnu";

  if (err.message.includes("password")) errors.password = "Erreur password";

  if (err.message.includes("firstname")) errors.nom = "Erreur nom";

  if (err.message.includes("lastname")) errors.prenom = "Erreur prenom";

  if (err.message.includes("telephone")) errors.telephone = "Erreur tel";

  return errors;
};

module.exports.signInErrors = (err) => {
  let errors = { email: "", password: "" };

  if (err.message.includes("email")) errors.email = "Email inconnu";

  if (err.message.includes("password"))
    errors.password = "Le mot de passe ne correspond pas";

  return errors;
};
