const express = require('express');
const { viewType, getAllTypes} = require('../controllers/pokemonControllers');
const router = express.Router()
router.get('/', getAllTypes)    
module.exports = router;   