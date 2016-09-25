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

get data from ajax call and store it in a global variable
function ajax1() {
    var tmp;
    $.ajax({
        async: false,
        type: "GET",
        url: 'http://chenjonathan-cornucopia.herokuapp.com/api/recipe/' + highlighted[i]['_id'] + '/ingredients',
        data: {appName: $.query.get("appName")},
        success: function (error, component) {
            globalData = component;
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
        var ingredientsArr = [];
        var highlighted = JSON.parse(highlightedRecipes.body);

        console.log("here");
        console.log(ingredientArr);

        for (var i = 0; i < highlighted.length; i++) {
            groceryList = function() {
                var component;
                component = request.get('http://chenjonathan-cornucopia.herokuapp.com/api/recipe/' + highlighted[i]['_id'] + '/ingredients')
                try {
                    var groceryPromise = groceryList();
                    groceryPromise.then(function() {
                        ingredientsArr.push(component);
                }, function(error) {
                    console.log("promise broken");
                });
                } catch (e) {
                    console.log("js is such shit");
                }
            }
        }
        res.render('profile/groceries', {
            ingredients: ingredientsArr
        });
    });
};
