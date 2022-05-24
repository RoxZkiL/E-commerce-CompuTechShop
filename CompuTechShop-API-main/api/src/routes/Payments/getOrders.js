const router = require("express").Router();
const { getOrders,getOrdersEmail } = require("../../Controllers/Payments");


router.get('/', async (req,res) => {
  const {userEmail} = req.query
	try {
    if(userEmail){
      const order = await getOrdersEmail(userEmail)
      res.send(order)
    }
    else{
      const orders = await getOrders()
      res.send(orders)
    }
	}
	catch(err){
		console.log(err)
	}
})
module.exports = router;
