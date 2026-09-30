const express = require('express')
const {getAllCount} = require('../controllers/pokemonControllers')

const router = express.Router()
router.get('/',async (req,res)=>{
    getAllCount(req,res)
})    
module.exports = router;  
