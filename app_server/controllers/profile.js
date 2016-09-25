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
            res.render('profile/profile', {
                user: object.user,
                points: object.points,
                recipesSubmitted: JSON.parse(recipesSubmitted.body),
            });
        });
    });
};

module.exports.profileRecipes = function(req, res, next) {
    request.get('http://chenjonathan-cornucopia.herokuapp.com/api/user/' + req.params.userId, function(err, response) {
        if (err) {
            next(err);
        }
        var object = JSON.parse(response.body);
        request.get('http://chenjonathan-cornucopia.herokuapp.com/api/user/' + req.params.userId + '/saved', function(error, recipesSaved) {
            console.log(JSON.parse(recipesSaved.body));
            res.render('profile/recipes', {
                user: object.user,
                recipesSaved: JSON.parse(recipesSaved.body)
            });
        });
    });
};

/*var globalData;

//get data from ajax call and store it in a global variable
function ajax1() {
    var tmp = null;
    $.ajax({
        async: false,
        type: "GET",
        url: 'http://chenjonathan-cornucopia.herokuapp.com/api/user/',
        data: {appName: $.query.get("appName")},
        success: function (data) {
            globalData = data;
            tmp = data;
        }
    });

    return tmp;
}*/

module.exports.profileGroceries = function(req, res, next) {
    request.get('http://chenjonathan-cornucopia.herokuapp.com/api/user/' + req.params.userId + '/highlighted', function(err, highlightedRecipes) {
        if (err) {
            next(err);
        }
        //$.when(ajax1()).done(function () {
            request.get('http://chenjonathan-cornucopia.herokuapp.com/api/recipe/:recipeId/ingredients' + req.params.recipeId + '/ingredients', function(error, components) {
                res.render('profile/groceries', {
                    selected : JSON.parse(highlightedRecipes.body),
                    ingredients : JSON.parse(components.body)
            });
        });
    });

};
