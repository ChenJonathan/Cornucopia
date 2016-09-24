var express = require('express');
var router = express.Router();

var controlRecipes = require('../controllers/recipes');
var controlGroceries = require('../controllers/groceries');
var controlFeed = require('../controllers/feed');
var controlOther = require('../controllers/other');
var controlProfile = require('../controllers/profile');


/* Recipe pages */
router.get('/recipes/:recipeId', controlRecipes.recipeInfo);
router.get('/recipes/new', controlRecipes.recipeNew);

/* Feed pages*/
router.get('/feed', controlFeed.feedList);

/* Groceries pages */
router.get('/:userId/groceries', controlGroceries.groceryList);

/* Other pages */
router.get('/', controlOther.home);
router.get('/login', controlOther.login);
router.get('/register', controlOther.register);

/* Profile pages */
router.get('/:userId', controlProfile.profileUserId);
router.get('/:userId/recipes', controlProfile.profileUserRecipes);

module.exports = router;
