var request = require('request');

module.exports.recipeInfo = function(req, res, next) {
    request.get('http://chenjonathan-cornucopia.herokuapp.com/api/recipe/' + req.params.recipeId, function(err, response) {
        if (err) {
            next(err);
        }
        var recipe = response['body'];
        res.render('recipes/info', {
            title: recipe
        });
    });
};


module.exports.recipeCreate = function(req, res) {
    res.render('recipes/create', {
        title: "Test"
    });
};