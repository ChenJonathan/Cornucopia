var request = require('request');

module.exports.recipeInfo = function(req, res, next) {
    request.get('http://chenjonathan-cornucopia.herokuapp.com/api/recipe/' + req.params.recipeId, function(err, response) {
        if (err) {
            next(err);
        }
        var recipe = response['body'];
        res.render('recipes/info', {
            name: recipe.name,
            author: recipe.author,
            instructions: recipe.instructions,
            rating: recipe.rating,
            ingredients: recipe.ingredients
        });
    });
};


module.exports.recipeCreate = function(req, res) {
    res.render('recipes/create', {
        title: "Create New Recipe"
    });
};
