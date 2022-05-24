const { Router } = require("express");
const router = Router();
const { Product, Category } = require("../db");

router.get("/", async (req, res) => {
  try {
    const { brand } = req.query;
    const products = await Product.findAll({
      where: {
        brand: brand,
      },
      include: {
        model: Category,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    if (!products.length)
      return res.send({ msg: "No se encontraron productos con esa marca" });
    else {
      const resultado = products.map((p) => {
        return {
          id: p.id,
          name: p.name,
          image: p.image,
          price: p.price,
          quantity: p.quantity,
          brand: p.brand,
          description: p.description,
          calification: p.calification,
          category: p.categories.map((e) => e.name),
        };
      });
      res.send(resultado);
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
