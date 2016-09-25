var request = require('request');

module.exports.profileUser = function(req, res, next) {
    request.get('http://chenjonathan-cornucopia.herokuapp.com/api/user/' + req.params.userId, function (err, response) {
        if (err) {
            next(err);
        }
        var object = JSON.parse(response.body);
        request.get('http://chenjonathan-cornucopia.herokuapp.com/api/user/' + req.params.userId + '/submitted', function (err, recipesSubmitted) {
            if (err) {
                next(err);
            }
            request.get('http:/chenjonathan-cornucopia.herokuapp.com/api/user/' + req.params.userId + '/saved', function(error, recipesSaved)) {
                res.render('profile/profile', {
                    user: object.user,
                    points: object.points,
                    recipesSubmitted: JSON.parse(recipesSubmitted.body),
                    recipesSaved: JSON.parse(recipesSaved.body)
                });
            });
        });
    });
};

module.exports.profileRecipes = function(req, res, next) {
    request.get('http://chenjonathan-cornucopia.herokuapp.com/api/user/' + req.params.userId + '/submitted', function(err, response) {
        if (err) {
            next(err);
        }
            request.get('http:/chenjonathan-cornucopia.herokuapp.com/api/user/' + req.params.userId + '/saved', function(error, recipesSaved)) {
                res.render('profile/recipes', {
                    user: object.user,
                    recipesSaved: JSON.parse(recipesSaved.body)
                });
            });
    });
};

module.exports.profileGroceries = function(req, res, next) {
    res.render('profile/groceries', {
        title: 'Test id' + req.params.userId
    });
};
