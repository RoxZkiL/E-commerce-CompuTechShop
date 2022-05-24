const router = require("express").Router();
const { Product, Category } = require("../../db");

router.post("/", async (req, res, next) => {
  const {
    name,
    image,
    price,
    quantity,
    brand,
    description,
    calification,
    categories,
  } = req.body;

  try {
    let newProduct = await Product.create({
      name,
      image,
      price,
      quantity,
      brand,
      description,
      calification,
    });
    let newProductCategory = await Category.findAll({
      where: { name: categories },
    });

    newProduct.addCategory(newProductCategory);
    res.send("PRODUCTO AGREGADO");
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
