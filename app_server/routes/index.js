var express = require('express');
var router = express.Router();

var controlRecipes = require('../controllers/recipes');
var controlFeed = require('../controllers/feed');
var controlProfile = require('../controllers/profile');
var controlOther = require('../controllers/other');


/* Recipe pages */
router.get('/recipes/new', controlRecipes.recipeCreate);
router.get('/recipes/:recipeId', controlRecipes.recipeInfo);

/* Feed pages*/
router.get('/feed', controlFeed.feedList);

/* Profile pages */
router.get('/users/:userId', controlProfile.profileUser);
router.get('/users/:userId/recipes', controlProfile.profileRecipes);
router.get('/users/:userId/groceries', controlProfile.profileGroceries);

/* Other pages */
router.get('/login', controlOther.login);
router.get('/register', controlOther.register);
router.get('/', controlOther.home);

module.exports = router;
