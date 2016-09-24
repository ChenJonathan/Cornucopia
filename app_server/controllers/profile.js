/* GET 'location list' page. */
module.exports.profileUserId = function(req, res) {
    res.render('index', {
        title: 'Test id' + req.params.userId,
    });
};

module.exports.profileUserRecipes = function(req, res) {
    res.render('index', {
        title: 'Test id' + req.params.userId,
    });
};