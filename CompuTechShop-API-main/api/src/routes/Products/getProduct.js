const router = require("express").Router();

const { products, productName }  = require('../../Controllers/Products');




router.get('/', async (req,res) => {
  const {name} = req.query
	try {
    if(name){
      const product = await productName(name)
      res.send(product)
    }
    else{
      const info = await products()
      res.send(info)
    }
	}
	catch(err){
		console.log(err)
	}
})


module.exports = router;