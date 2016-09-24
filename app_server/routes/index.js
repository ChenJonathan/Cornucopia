var express = require('express');
var router = express.Router();

var controlRecipes = require('../controllers/recipes');
var controlOther = require('../controllers/other');

/* Recipe pages */
router.get('/', controlOther.home);
router.get('/login', controlOther.login);
router.get('/register', controlOther.register);
router.get('/recipes', controlRecipes.recipeList);

module.exports = router;