// controllers/recipes.js

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Recipe = require('../models/recipe.js');

// router logic will go here - will be built later on in the lab

//Root Rout
router.get('/', async (req, res) => {
  res.render('recipes/index.ejs');
});

//add New
router.get('/new', async(req,res)=>{
  res.render('recipes/new.ejs')
})

router.post('/', async (req,res)=>{
  try{
    req.body.owner = req.session.user._id
    await Recipe.create(req.body)
    res.redirect('/recipes')
  }catch(error){
    console.log(error)
    res.redirect('/')
  }
})



//Export
module.exports = router;