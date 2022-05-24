const router = require("express").Router();

const {getPaymentsById,getPayments, getPaymentByUserEmail} = require('../../Controllers/Payments');


router.get("/", async (req, res) => {
  const {id,email} = req.query
 
  try {
    if(id){
      const payments = await getPaymentsById(id)
      res.send(payments);
    } 
    if(email){
      const payments = await getPaymentByUserEmail(email)
      res.send(payments);
    }
    else {
      const payments = await getPayments()
      res.send(payments);
    }
  } catch (err) {
    console.log("Error en getPayment",err);
  }
});

module.exports = router;
