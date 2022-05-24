const router = require("express").Router();
const {Carrusel } = require("../../db")


router.post("/", async (req, res, next) =>{

	const {
		image, 
	} = req.body
		
	try {
		let newProduct = await Carrusel.create({
			image, 
		});

		res.send("Img agregada")

	} catch (error) {
		res.send(error);
	}	
})




module.exports = router;