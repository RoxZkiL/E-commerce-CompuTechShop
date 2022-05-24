const router = require("express").Router();
const { allCategories }  = require('../../Controllers/AllCategories')


router.get("/", async (req,res) =>{
    const categories = await allCategories();
    res.send(categories)
})


module.exports = router
