const router = require("express").Router();
const { Category } = require("../../db");

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    if (id) {
      await Category.destroy({
        where: { id },
      });
      res.send(200, "Category eliminated");}
   
  } catch (error) {
    res.send(403, `Error en deleteCategory: ${error}`);
  }
});

module.exports = router;
