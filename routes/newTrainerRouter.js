const express = require('express')
const {createTrainer} = require('../controllers/pokemonControllers')
const router = express.Router()
const DEFAULT_TRAINER_IMAGE = "https://play.pokemonshowdown.com/sprites/trainers/unknown.png"
router.get('/',async (req,res)=>{
    createNewTrainer(req,res)
})

router.post('/',createTrainer)
module.exports = router;