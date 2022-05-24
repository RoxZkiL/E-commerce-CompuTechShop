const router = require("express").Router();
const { Category } = require("../../db");

router.post("/", async (req, res, next) => {
  const { name } = req.body;
  try {
    if (name) {
      await Category.findOrCreate({
        where: { name: name},
      });
      res.send(200, "Categoria añadida");
    }
  } catch (error) {
    res.send(403, `Error en postCategory: ${error}`);
  }
});

module.exports = router;
