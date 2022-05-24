const router = require("express").Router();
const { getPaymentByUserEmail }  = require('../../Controllers/Payments');

router.get('/:userEmail', async (req,res) => {
  const {userEmail} = req.params
	try {
      const userPayment = await getPaymentByUserEmail(userEmail)

      if(userPayment.length===0){res.send({email: userEmail,totalAmount:0})}

      let totalAmount={email: userEmail,totalAmount: userPayment.reduce((acc, element) =>{
       return element.total_paid_amount + acc
      },0) }
      
      res.send(totalAmount)
    }
	catch(err){
		console.log("Error en getAmountPaymentsUserEmail", err)
	}
})


module.exports = router;