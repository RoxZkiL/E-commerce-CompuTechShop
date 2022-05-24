const router = require("express").Router();
const { Product, Category, Wishlist } = require("../../db");

router.post("/", async (req, res, next) => {
  const {
    userId, 
    products
  } = req.body;

  try {
    let newWishlist = await Wishlist.create({
      userId
    });
    let newProductWishlist = await Product.findAll({
      where: { name: products },
    });

    newWishlist.addProduct(newProductWishlist);
    res.send("WISHLIST AGREGADO");
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
