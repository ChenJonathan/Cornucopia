var mongoose = require('mongoose');

var Recipe = require('../models/recipe');
var User = require('../models/user');

module.exports.getUsers = function(req, res) {
  User.find({}, function(err, user) {
    res.status(200);
    res.json(user);
  });
};

module.exports.postUser = function(req, res) {
  var user = new User({
    user: req.body.user,
    password: req.body.password,
    points: 0,
    recipesSubmitted: 0,
    recipesSaved: 0,
    recipesHighlighted: 0
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
    res.json(user[0]);
  });
};

module.exports.getUserSubmittedRecipes = function(req, res, next) {
  User.find({_id: req.params.userId}, function(err, user) {
    if (err) {
      next(err);
    }
    var ids = user[0].recipesSubmitted;
    ids = ids.map(function(id) { return new mongoose.mongo.ObjectId(id); });
    Recipe.find({_id: {$in: ids}}).exec(function(err, recipes) {
      res.status(200);
      res.json(recipes);
    });
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
    User.find({_id: req.params.userId}, function(err, user) {
      if (err) {
        next(err);
      }
      var ids = user[0].recipesSaved;
      ids = ids.map(function(id) { return new mongoose.mongo.ObjectId(id); });
      Recipe.find({_id: {$in: ids}}).exec(function(err, recipes) {
        res.status(200);
        res.json(recipes);
      });
    });
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
    User.find({_id: req.params.userId}, function(err, user) {
      if (err) {
        next(err);
      }
      var ids = user[0].recipesHighlighted;
      ids = ids.map(function(id) { return new mongoose.mongo.ObjectId(id); });
      Recipe.find({_id: {$in: ids}}).exec(function(err, recipes) {
        res.status(200);
        res.json(recipes);
      });
    });
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
