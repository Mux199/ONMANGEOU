module.exports.signUpErrors = (err) => {
  console.log("error utils");
  console.log(err);
  console.log("err.errors");
  console.log(err.errors);
  console.log("err.errors.email");
  console.log(err.errors.email);
  console.log(err.errors.email.properties.message);
  console.log("err.message");

  console.log(err.message);

  let errors = { email: "", password: "", nom: "", prenom: "", telephone: "" };

  if (err.message.includes("email"))
    errors.email = err.errors.email.properties.message.replace("Path ", "");

  if (err.message.includes("password")) {
    if (err.errors.password.properties.message.includes("shorter"))
      errors.password = "`password` is to short";
    else {
      errors.password = err.errors.password.properties.message.replace(
        "Path ",
        ""
      );
    }
  }

  errors.password = errors.password.replace(new RegExp(`.*[(?)]+.*`), "");
  console.log(errors.password);

  if (err.message.includes("firstname"))
    errors.nom = err.errors.firstname.properties.message.replace("Path ", "");

  if (err.message.includes("lastname"))
    errors.prenom = err.errors.lastname.properties.message.replace("Path ", "");

  if (err.message.includes("telephone"))
    errors.telephone = err.errors.telephone.properties.message.replace(
      "Path ",
      ""
    );

  return errors;
};

module.exports.signInErrors = (err) => {
  let errors = { email: "", password: "" };

  if (err.message.includes("email")) errors.email = "Email inconnu";

  if (err.message.includes("password"))
    errors.password = "Le mot de passe ne correspond pas";

  return errors;
};
