const { Router } = require("express");
const router = Router();
const { Product, Category } = require("../db");

router.get("/", async (req, res) => {
  // RECORDAR CAMBIAR LA CONTRASEÑA DE LA BASE DE DATOS ANTES DE PUSHEAR
  try {
    const { category } = req.query;
    const matchedProducts = await Category.findAll({
      where: {
        name: category,
      },
      include: [
        {
          model: Product,
          attributes: [
            "id",
            "name",
            "image",
            "price",
            "quantity",
            "brand",
            "description",
            "calification",
          ],
          through: {
            attributes: [],
          },
        },
      ],
    });
    if (!matchedProducts.length)
      return res.send({ msg: "No se encontro un producto con esa categoria" });
    else {
      const productCategory = matchedProducts.map((el) => el.name);
      const rawData = matchedProducts[0].products.map((el) => el.dataValues);
      const result = rawData.map((el) => {
        return {
          id: el.id,
          name: el.name,
          image: el.image,
          price: el.price,
          quantity: el.quantity,
          brand: el.brand,
          description: el.description,
          calification: el.calification,
          category: productCategory,
        };
      });
      res.send(result);
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
