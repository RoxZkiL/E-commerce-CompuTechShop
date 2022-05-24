const router = require("express").Router();
const { User } = require('../../db');
const { userId } = require('../../Controllers/Users');

router.get('/:id', async (req, res) => {
  const {id} = req.params

  const detail = await userId(id)
  detail ? res.send(detail) : res.send('This user was not found')
  return 
  
})




module.exports = router;