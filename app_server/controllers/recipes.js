var request = require('request');

module.exports.recipeInfo = function(req, res, next) {
    request.get('http://chenjonathan-cornucopia.herokuapp.com/api/recipe/' + req.params.recipeId, function(err, response) {
        if (err) {
            next(err);
        }
        var recipe = JSON.parse(response['body']);
        console.log(recipe);
        res.render('recipes/info', {
            name: recipe.name,
            author: recipe.author,
            instructions: recipe.instructions,
            rating: recipe.rating,
            ingredients: recipe.ingredients
        });
    });
};
