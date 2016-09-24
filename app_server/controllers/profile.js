var request = require('request');

module.exports.profileUser = function(req, res) {
    request.get('http://localhost:3000/api/user/' + req.params.userId, function (err, response) {
        if (err) {
            next(err);
        }
        res.render('profile/profile', {
            title: 'Test id'  + req.params.userId
        });
    });
};

module.exports.profileRecipes = function(req, res) {
    request.get('http://localhost:3000/user/' + req.params.userId + '/submitted', function(err, response) {
        if (err) {
            next(err);
        }
        res.render('profile/recipes', {
            title: 'Test id' + req.params.userId
        });
    });
};

module.exports.profileGroceries = function(req, res) {
    res.render('profile/groceries', {
        title: 'Test id' + req.params.userId
    });
};
