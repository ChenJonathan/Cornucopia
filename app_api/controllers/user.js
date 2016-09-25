var mongoose = require('mongoose');

var User = require('../models/user');

module.exports.postUser = function(req, res) {
  var user = new User({
    user: req.body.user,
    password: req.body.password,
    points: req.body.points,
    recipesSubmitted: req.body.recipesSubmitted,
    recipesSaved: req.body.recipesSaved,
    recipesHighlighted: req.body.recipesHighlighted
  });
  user.save(function(err) {
    if(err) {
      return next(err);
    }
    res.json(201);
  });
};

module.exports.getUserById = function(req, res) {
  User.find({_id: req.params.userId}, function(err, user) {
    res.status(200);
    res.json(user);
  });
};

module.exports.getUserSubmittedRecipes = function(req, res) {
  var user = getUserById(req, res);
  var ids = user.recipesSubmitted;
  ids = ids.map(function(id) { return ObjectId(id); });
  Recipe.find({_id: {$in: ids}}).exec(function(err, recipes) {
      res.status(200);
      res.json(recipes);
  });
};

module.exports.postUserSubmittedRecipe = function(req, res) {
  var user = getUserById(req, res);
  user.recipesSubmitted.push(req.body.recipe);
  user.save(function(err) {
    if(err) {
      return next(err);
    }
    res.json(200);
  });
};

module.exports.getUserSavedRecipes = function(req, res) {
  var user = getUserById(req, res);
  res.json(user.recipesSaved);
};

module.exports.postUserSavedRecipe = function(req, res) {
  var user = getUserById(req, res);
  user.recipesSaved.push(req.body.recipe);
  user.save(function(err) {
    if(err) {
      return next(err);
    }
    res.json(200);
  });
};

module.exports.getUserHighlightedRecipes = function(req, res) {
  var user = getUserById(req, res);
  res.json(user.recipesHighlighted);
};

module.exports.postUserHighlightedRecipe = function(req, res) {
  var user = getUserById(req, res);
  user.recipesHighlighted.push(req.body.recipe);
  user.save(function(err) {
    if(err) {
      return next(err);
    }
    res.json(200);
  });
};
