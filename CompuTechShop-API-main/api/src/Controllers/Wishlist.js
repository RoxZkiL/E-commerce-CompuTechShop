const { Product, Wishlist } = require("../db");

const wishlist = async () => {
  const arrDB = await Wishlist.findAll({
    include: {
      model: Product,
      attributes: ["id", "name", "image", "price", "brand", "calification"]
    }
  })
  const result = await arrDB.map(el => {
    //console.log(el.products)
    return {
      id: el.id,
      user: el.userId,
      productId: el.products.map(p => p.dataValues.id),
      product: el.products.map(p => p.dataValues.name),
      image: el.products.map(p => p.dataValues.image),
      price: el.products.map(p => p.dataValues.price),
      brand: el.products.map(p => p.dataValues.brand),
      calification: el.products.map(p => p.dataValues.calification)
    }
  })
  return result
}

const wishlistByUserId = async (userId) => {
  const userDB = await Wishlist.findAll({
    where: {
      userId
    },
    include: {
      model: Product,
      attributes: ["id", "name", "image", "price", "brand", "calification"]
    }
  })
  const result = await userDB.map(el => {
    //console.log(el.products)
    return {
      id: el.id,
      user: el.userId,
      productId: el.products.map(p => p.dataValues.id),
      product: el.products.map(p => p.dataValues.name),
      image: el.products.map(p => p.dataValues.image),
      price: el.products.map(p => p.dataValues.price),
      brand: el.products.map(p => p.dataValues.brand),
      calification: el.products.map(p => p.dataValues.calification)
    }
  })
  return result
}

module.exports = { wishlist, wishlistByUserId };