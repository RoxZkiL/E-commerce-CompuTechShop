const router = require("express").Router();
const {Product, Reviews, User } = require("../../db");

router.put('/:id', async (req, res) => {
  const {id} = req.params
  console.log(id)
  try {
    const {id} = req.params
    const {
      comment,
      calification
    } = req.body
    const updateComment = await Reviews.update(
      { comment, calification },
      {where: {id}}
    )
    res.send(updateComment)
  }
  catch(err) {
    console.log(err)
  }
})

module.exports = router;