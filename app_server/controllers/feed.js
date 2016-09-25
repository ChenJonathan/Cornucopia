var request = require('request');

module.exports.feedList = function(req, res) {
    request.get("http://chenjonathan-cornucopia.herokuapp.com/api/recipe", function(err, response) {
        res.render('feed/feed', {
            recipes: JSON.parse(response.body)
        });
    });
};
