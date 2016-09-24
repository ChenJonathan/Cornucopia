var express = require('express');
var router = express.Router();

var controlRecipes = require('../controllers/recipes');
var controlOther = require('../controllers/other');
var controlGroceries = require('../controllers/groceries');
var controlFeed = require('../controllers/feed');

/* Recipe pages */
router.get('/', controlOther.home);
router.get('/recipes', controlRecipes.recipeList);
router.get('/groceries', controlGroceries.groceryList);
router.get('/feed', controlFeed.feedList);



module.exports = router;
