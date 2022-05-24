const router = require("express").Router();
const { User } = require("../../db");
const { users, userName, userEmail } = require("../../Controllers/Users");
const {
  getPaymentByUserEmail,
  getPaymentByUserName,
} = require("../../Controllers/Payments");

router.get("/", async (req, res) => {
  const { given_name, email } = req.query;
  try {
    if (given_name) {
      const user = await userName(given_name);
      const userPayment = await getPaymentByUserEmail(user.email);

      if (userPayment.length !== 0) {
        let totalAmount = userPayment.reduce((acc, element) => {
          return element.total_paid_amount + acc;
        }, 0);
        if (totalAmount) {
          user.totalAmount = totalAmount;
        }
      }

      res.send(user);
    } else if (email) {
      const user = await userEmail(email);
      const userPayment = await getPaymentByUserEmail(email);

      if (userPayment.length !== 0) {
        let totalAmount = userPayment.reduce((acc, element) => {
          return element.total_paid_amount + acc;
        }, 0);
        if (totalAmount) {
          user.totalAmount = totalAmount;
        }
      }
      res.send(user);
    } else {
      const info = await users();
      // la logica para que traiga el total_paid amount esta en el controlador de users()
      res.send(info);

    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
