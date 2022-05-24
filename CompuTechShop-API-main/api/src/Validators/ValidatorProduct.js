 const { check } = require("express-validator");
const { validateResult } = require("../helpers/helperValidator");

(req) => {
  console.log(req);
};

const validatorProduct = [
  check("name")
    .exists()
    .custom((value, { req }) => {

      if (value.length < 1) throw new Error("the name entered is too short");
      return true;
    }),

  check("price")
    .exists()
    .custom((value, { req }) => {
      value = Number(value);  //todo validacion por si incluye coma
      if (value <= 0) throw new Error("Price must be a positive number");
      return true;
    }),
  check("quantity")
    .exists()
    .custom((value, { req }) => {
      value = Number(value);
      if (isNaN(value)) throw new Error("quantity must be a number");
      if (value < 0) throw new Error("quantity must be a positive number");
      return true;
    }),
  check("brand")
    .exists()
    .custom((value, { req }) => {
      if (value.length < 1) throw new Error("the brand entered is too short");
      return true;
    }),
  check("description")
    .exists(),
  check("calification")
    .exists()
    .custom((value, { req }) => {
      if (isNaN(value)) throw new Error("calification must be a number");
      if (value < 0) throw new Error("calification must be a positive number");
      if (value < 0 || value > 5)
        throw new Error("calification must be a number between 0 to 5");
      return true;
    }),
  check("categories")
    .exists()
    .custom((value, { req }) => {
      if (value.length === 0) throw new Error("The category cannot be empty");
      return true;
    }),
  check("image").exists(),
 
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = { validatorProduct };
