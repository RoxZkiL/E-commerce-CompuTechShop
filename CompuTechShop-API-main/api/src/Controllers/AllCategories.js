const { Category } = require("../db");




const allCategories = async () => {
    try {
      const categoriesDB = await Category.findAll();
      if (!categoriesDB.length) {                  //todo: Verificacion en caso de querer agregar mas categorias. ej.:Celulares.
        const cat = ['Laptops', 'Monitors', 'Mouses', 'Headsets', 'Keyboards']
        cat.map(
          async (e) =>
            await Category.findOrCreate({
              where: {
                name: e,
              },
            })
        );
        return cat;
      } else {
        return categoriesDB
      }
    } catch (error) {
      console.log(error);
    }
  };
  allCategories();

  module.exports = { allCategories };