const express = require('express')
const {findTrainer, addPokemonToTrainer,deletePokemonFromTrainer,deleteTrainer} = require('../controllers/pokemonControllers')

const router = express.Router({ mergeParams: true });
router.use(express.urlencoded({ extended: true }));
router.get('/',async (req,res)=>{
    findTrainer(req,res)
})   

router.post('/add',addPokemonToTrainer)

router.post('/delete', async (req,res) => {
    deleteTrainer(req,res)
})

router.post('/:id', async (req,res)=>{
    deletePokemonFromTrainer(req,res)
})

module.exports = router;     
