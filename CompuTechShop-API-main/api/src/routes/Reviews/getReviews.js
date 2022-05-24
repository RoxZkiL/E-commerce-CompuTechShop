const router = require("express").Router();

const { getAllComments, getCommentByUserId, getCommentByProductId, getCommentByProductName }  = require('../../Controllers/Reviews');


router.get('/', async (req,res) => {
  const {userId} = req.query
  const {productId} = req.query
  const {productName} = req.query
	try {
    if(productName){
      const product = await getCommentByProductName(productName)
      res.send(product)
    }
    else if(userId){
      const product = await getCommentByUserId(userId)
      res.send(product)
    }
    else if(productId){
      const product = await getCommentByProductId(productId)
      res.send(product)
    }
    else{
      const info = await getAllComments()
      res.send(info)
    }
	}
	catch(err){
		console.log(err)
	}
})


module.exports = router;