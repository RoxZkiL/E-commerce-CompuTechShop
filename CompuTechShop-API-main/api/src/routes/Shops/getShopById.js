const router = require("express").Router();
const {Product } = require("../../db");
const { getShopsById }  = require('../../Controllers/Shops');




router.get('/:id', async (req,res) => {
  const {id} = req.params
	try {
      const info = await getShopsById(id)
      res.send(info)
	}
	catch(err){
		console.log(err)
	}
})


module.exports = router;