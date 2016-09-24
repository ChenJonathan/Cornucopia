var mongoose = require('mongoose');

var Recipe = require('../models/recipe');

module.exports.getAllRecipes = function(req, res) {
  Recipe.find({}, function(err, recipes) {
    res.status(200);
    res.json(recipes);
  });
};

module.exports.getRecipeById = function(req, res) {
  Recipe.find({_id: req.params.recipeId}).exec(function(err, recipe) {
      res.status(200);
      res.json(recipe[0]);
  });
};

module.exports.postNewRecipe = function(req, res) {

};

module.exports.getIngredientsByRecipeId = function(req, res) {
  var recipe = getRecipeById(req, res);
  res.json(recipe.ingredients);
};
