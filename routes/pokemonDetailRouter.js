const express = require('express')
const {findPokemon,deletePokemon} = require('../controllers/pokemonControllers')

const router = express.Router({ mergeParams: true });
router.use(express.urlencoded({ extended: true }));
router.get('/',async (req,res)=>{


    findPokemon(req,res)
})

router.post('/delete', async (req,res)=>{

    deletePokemon(req,res)
})

module.exports = router;