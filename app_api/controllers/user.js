var mongoose = require('mongoose');

var User = require('../models/user');

module.exports.postUser = function(req, res) {
};

module.exports.getUserById = function(req, res) {
  User.find({_id: req.params.userId}).exec(function(err, user) {
    res.status(200);
    res.json(user[0]);
  });
};

module.exports.updateUser = function(req, res) {

};

module.exports.getUserSubmittedRecipes = function(req, res) {
  var user = getUserById(req, res);
  res.json(user.recipesSubmitted);
};

module.exports.postUserSubmittedRecipe = function(req, res) {

};

module.exports.getUserSavedRecipes = function(req, res) {
  var user = getUserById(req, res);
  res.json(user.recipesSaved);
};

module.exports.postUserSavedRecipe = function(req, res) {

};

module.exports.getUserHighlightedRecipes = function(req, res) {
  var user = getUserById(req, res);
  res.json(user.recipesHighlighted);
};

module.exports.postUserHighlightedRecipe = function(req, res) {

};
