const { check } = require("express-validator");
const { validateResult } = require("../helpers/helperValidator");

(req) => {
  console.log(req);
};

const validatorCategory = [
  check("name")
    .exists()
    .custom((value, { req }) => {
      if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ]+$/.test(value))
        throw new Error("Invalid name caracters");
      if (value.length < 1)
        throw new Error("the name Category entered is too short");
      return true;
    }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = { validatorCategory };
