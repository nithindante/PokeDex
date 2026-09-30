const express = require('express')
const {viewPokemon, getAllPokemon} = require('../controllers/pokemonControllers')
const router = express.Router()
router.get('/', getAllPokemon)    

module.exports = router;   