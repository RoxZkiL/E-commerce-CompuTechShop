const router = require("express").Router();
const {Product, Category } = require("../../db");


router.put('/:id', async (req,res) => {
	try {
		const {id} = req.params
		const {
			name, 
			image,
			price,
			quantity,
			brand,
			description,
			calification,
			categories
		} = req.body
		const updateProduct = await Product.update(
			{name, image, price, quantity, brand, description, calification},
			{
				where: {id}
			}
		)
		let dbCategory = await Category.findAll({
			where: {
				name: categories
			}
		})
		//console.log('id: ', dbCategory.dataValues.id)
		const product = await Product.findOne({where: {id}})
		//console.log(product)
		product.setCategories(dbCategory.map(c => c.id))
		res.send({msg: 'actualizado'})
	}
	catch(err){
		console.log(err)
	}
})


module.exports = router;