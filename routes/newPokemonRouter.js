const express = require('express')
const {createPokemon,reDirectToNewPokemon} = require('../controllers/pokemonControllers')
const  router = express.Router()
router.use(express.urlencoded({ extended: true }));
router.get('/',async (req,res)=>{
    await reDirectToNewPokemon(req,res)
})    

router.post('/',async (req,res) => {
    console.log(req.body,"pokemon")
    createPokemon
})
module.exports = router;  