var request = require('request');

module.exports.feedList = function(req, res) {
    request.get("http://chenjonathan-cornucopia.herokuapp.com/api/recipe", function(err, response) {
        console.log(JSON.parse(response.body));
        res.render('feed/feed', {
            title: "Test",
            recipes: JSON.parse(response.body)
        });
    });
};
