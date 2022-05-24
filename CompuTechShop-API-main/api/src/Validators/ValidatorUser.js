const { check } = require("express-validator");
const { validateResult } = require("../helpers/helperValidator");

(req) => {
  console.log(req);
};

const validatorUser = [
  check("given_name")
    .exists()
    .custom((value, { req }) => {
      if (value.length < 1) throw new Error("the name entered is too short");
      return true;
    }),
  check("family_name")
    .exists()
    .custom((value, { req }) => {
      if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ]+$/.test(value))
        throw new Error("Invalid lastName caracters");
      if (value.length < 1) throw new Error("the name entered is too short");
      return true;
    }),
  check("nickname")
    .exists() //todo: Validacion para nombre de usuario, deberia poder poner numeros y signos
    .custom((value, { req }) => {
      if (value.length < 1)
        throw new Error("the nickName entered is too short");
      return true;
    }),
  check("email").exists(),
  check("email_verified").exists(),
  check("birthday").exists(),
  check("address").exists(),
  check("picture").exists(),
  check("phone").exists(), //todo: validaciones que tiene que tener un telefono celular
  check("is_admin").exists(),
  check("is_admin_pro").exists(),
  check("password").exists(), //todo: Validacion de contraseña
  check("is_banned").exists(), 
 
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = { validatorUser };
