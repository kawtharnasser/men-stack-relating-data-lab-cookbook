// controllers/recipes.js

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Recipe = require('../models/recipe.js');

// router logic will go here - will be built later on in the lab

//Root Rout
router.get('/', async (req, res) => {
  try{
    const recipes = await Recipe.find().populate('owner')
    res.render('recipes/index.ejs',{recipes});
  }catch(error){
    console.log(error)
    redirect('/')
  }
});

//add New functionality
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

// show functionality "display = get"
router.get('/:recipeId', async(req,res)=>{
  const recipe = await Recipe.findById(req.params.recipeId).populate('owner')
  res.render('recipes/show.ejs',{recipe})
})

//delete functionality
router.delete('/:recipeId', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId);
    if (recipe.owner.equals(req.session.user._id)) {
      await recipe.deleteOne();
      res.redirect('/recipes');
    } else {
      res.send("You don't have permission to do that.");
    }
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});

//edit functionality
router.get('/:recipeId/edit', async(req,res)=>{
  const recipe = await Recipe.findById(req.params.recipeId)
  res.render('recipes/edit.ejs',{recipe})
})

router.put('/:recipeId', async(req,res)=>{
  try{
    const recipe = await Recipe.findById(req.params.recipeId)
    if(recipe.owner.equals(req.session.user._id)){
      await recipe.updateOne(req.body)
      res.redirect('/recipes')
    }else{
      res.send("You don't have permission to do that.")
    }
  }catch(error){
    console.log(error)
    res.redirect('/')
  }
})




//Export
module.exports = router;