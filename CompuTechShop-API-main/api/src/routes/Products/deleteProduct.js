const router = require("express").Router();
const {Product } = require("../../db")


router.delete('/:id', async (req,res) => {
  const {id} = req.params
	try {
    if(id){
      await Product.destroy({
        where: {id}
      })
    }
    return res.send({ msg: "Product deleted" });
	}
	catch(err){
		console.log(err)
	}
})


module.exports = router;