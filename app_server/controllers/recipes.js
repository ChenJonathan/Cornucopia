var request = require('request');

module.exports.recipeInfo = function(req, res) {
    request.get('http://localhost:3000/api/recipe/' + req.params.recipeId, function(err, response) {
        if (err) {
            next(err);
        }
        var recipe = response['body'];
        console.log(recipe);
        res.render('recipes/info', {
        });
    });
};


//FIX ARRAY ISSUE
module.exports.recipeCreate = function(req, res) {
    var options = {
        method: 'POST',
        uri: 'http://localhost:3000/api/recipe',
        form: {
            'name': 'food',
            'author': 'user',
            'instructions': ['cook', 'bake'],
            'rating': 5,
            'ingredients': ['flour', 'salt', 'sugar']
        }
    };
    request(options, function(err, res, body) {
        if (err) {
            console.log(err);
            next(err);
        } else {
            console.log(res);
        }
    });
    res.render('recipes/create', {
        name: 'food',
        author: 'user',
        instructions: ['cook', 'bake'],
        rating: 5,
        ingredients: ['flour', 'salt', 'sugar']
    });
};
