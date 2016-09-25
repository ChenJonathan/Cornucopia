var express = require('express');
var router = express.Router();

var controlRecipes = require('../controllers/recipe');
var controlUsers = require('../controllers/user');

/* Recipe pages */
router.post('/recipe', controlRecipes.postNewRecipe);
router.get('/recipe', controlRecipes.getAllRecipes);
router.get('/recipe/:recipeId', controlRecipes.getRecipeById);
router.get('/recipe/:recipeId/ingredients', controlRecipes.getIngredientsByRecipeId);

/* User pages */
router.get('/user', controlUsers.getUsers);
router.post('/user', controlUsers.postUser);
router.get('/user/:userId', controlUsers.getUserById);
router.get('/user/:userId/submitted', controlUsers.getUserSubmittedRecipes);
router.post('/user/:userId/submitted', controlUsers.postUserSubmittedRecipe);
router.get('/user/:userId/saved', controlUsers.getUserSavedRecipes);
router.post('/user/:userId/saved', controlUsers.postUserSavedRecipe);
router.get('/user/:userId/highlighted', controlUsers.getUserHighlightedRecipes);
router.post('/user/:userId/highlighted', controlUsers.postUserHighlightedRecipe);

module.exports = router;
