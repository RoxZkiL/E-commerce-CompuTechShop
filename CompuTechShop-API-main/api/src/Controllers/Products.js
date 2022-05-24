const { Product, Category } = require("../db");
const { Op } = require("sequelize");
const jsonProducts = require("./JSON/JsonOfProducts");

const products = async () => {
  const arrDB = await Product.findAll({
    include: {
      model: Category,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  //este try lo que hace es llenar con unos productos la base de datos, los productos estan en el archivo json
  if (arrDB.length === 0) {
    try {
      jsonProducts.map(async (e) => {
        let newProduct = await Product.create({
          name: e.name,
          image: e.image,
          price: e.price,
          quantity: e.quantity,
          brand: e.brand,
          description: e.description,
          calification: e.calification,
        });
        let newProductCategory = await Category.findAll({
          where: { name: e.categories },
        });
        newProduct.addCategory(newProductCategory);
      });
      console.log("Base de datos de productos completada");
    } catch (error) {
      console.log("ERROR EN PRODUCTS");
    }
  }
  const result = await arrDB.map((p) => {
    return {
      id: p.id,
      name: p.name,
      image: p.image,
      price: p.price,
      quantity: p.quantity,
      category: p.categories.map((e) => e.name),
      brand: p.brand,
      comments: p.comments,
      description: p.description,
      calification: p.calification,
    };
  });
  return result;
};
const productName = async (name) => {
  try {
    //console.log(name);
    const nameDB = await Product.findAll({
      where: {
        name: { [Op.iLike]: `%${name}%` },
      },
      include: {
        model: Category,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    // console.log(nameDB)
    // console.log(nameDB[0].dataValues.id);
    const product = await nameDB.map((p) => {
      // console.log(p.product.dataValues.id)
      return {
        id: p.dataValues.id,
        name: p.dataValues.name,
        image: p.dataValues.image,
        price: p.dataValues.price,
        quantity: p.dataValues.quantity,
        category: p.categories.map((e) => e.name),
        brand: p.dataValues.brand,
        comments: p.comments,
        description: p.dataValues.description,
        calification: p.dataValues.calification,
      };
    });
    // console.log(product[0]);
    return product;
  } catch (error) {
    console.log(error);
  }
};


module.exports = { products, productName };
