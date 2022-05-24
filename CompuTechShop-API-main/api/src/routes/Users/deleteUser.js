const router = require("express").Router();
const { User } = require("../../db")


router.delete('/:id', async (req,res) => {
  const {id} = req.params
	try {
    if(id){
      await User.destroy({
        where: {id}
      })
    }
    return res.send({ msg: "User deleted" });
	}
	catch(err){
		console.log(err)
	}
})


module.exports = router;