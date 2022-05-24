const router = require("express").Router();
const { Reviews } = require("../../db")


router.delete('/:id', async (req,res) => {
  const {id} = req.params
	try {
    if(id){
      await Reviews.destroy({
        where: {id}
      })
    }
    return res.send({ msg: "Comment deleted" });
	}
	catch(err){
		console.log(err)
	}
})


module.exports = router;