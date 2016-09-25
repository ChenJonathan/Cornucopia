var request = require('request');

module.exports.profileUser = function(req, res, next) {
    request.get('http://chenjonathan-cornucopia.herokuapp.com/api/user/' + req.params.userId, function (err, response) {
        if (err) {
            next(err);
        }
        var object = JSON.parse(response.body);
        request.get('http://chenjonathan-cornucopia.herokuapp.com/api/user/' + req.params.userId + '/submitted', function (err, recipes) {
            if (err) {
                next(err);
            }
            res.render('profile/profile', {
                user: object.user,
                points: object.points,
                recipes: JSON.parse(recipes.body)
            });
        });
    });
};

module.exports.profileRecipes = function(req, res, next) {
    request.get('http://chenjonathan-cornucopia.herokuapp.com/api/user/' + req.params.userId + '/submitted', function(err, response) {
        if (err) {
            next(err);
        }
        res.render('profile/recipes', {
            submittedRecipes: response
        });
    });
};

module.exports.profileGroceries = function(req, res, next) {
    res.render('profile/groceries', {
        title: 'Test id' + req.params.userId
    });
};