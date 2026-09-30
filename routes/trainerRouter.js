const express = require('express');
const { viewTrainer,getAllTrainers } = require('../controllers/pokemonControllers');
const router = express.Router()
router.get('/',async (req,res)=>{
    getAllTrainers(req, res)
})    
module.exports = router;   