const router = require("express").Router();
const { Reviews } = require("../../db");


router.post("/", async (req, res) => {
  const {
    comment,
    userId,
    productId,
    calification
  } = req.body;
  try {
    let newComment = await Reviews.create({
      comment,
      userId,
      productId,
      calification
    });
    //console.log(newUser.dataValues.email);
    res.send("COMENTARIO AGREGADO");
  } catch (error) {
    console.log(error, "rutaPostComment");
  }
});


module.exports = router;