const router = require("express").Router();

const { wishlist, wishlistByUserId }  = require('../../Controllers/Wishlist');

router.get('/', async (req, res) => {
  const { userId } = req.query
  try {
    if(userId) {
      const info = await wishlistByUserId(userId)
      res.send(info)
    }
    else {
    const info = await wishlist()
    res.send(info)
    }
  }
  catch(err){
    console.log(err)
  }
})

module.exports = router;