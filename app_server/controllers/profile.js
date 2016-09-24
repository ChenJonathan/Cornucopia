/* GET 'location list' page. */
module.exports.profileUser = function(req, res) {
    res.render('profile/profile', {
        title: 'Test id ' + req.params.userId,
    });
};

module.exports.profileRecipes = function(req, res) {
    res.render('profile/recipes', {
        title: 'Test id ' + req.params.userId,
    });
};

module.exports.profileGroceries = function(req, res) {
    res.render('profile/groceries', {
        title: 'Test list' + req.params.userId,
    });
};