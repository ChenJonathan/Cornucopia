var express = require('express');
var router = express.Router();

var controlRecipes = require('../controllers/recipes');

/* Recipe pages */
router.get('/recipes/:recipeId', controlRecipes.recipesGetById);
router.post('/recipes', controlRecipes.recipesCreate);

module.exports = router;