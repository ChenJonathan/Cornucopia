/* GET 'location list' page. */
module.exports.recipeInfo = function(req, res) {
    res.render('index', {
        title: 'Test ' + req.params.recipeId,
    });
};

module.exports.recipeNew = function(req, res) {
    res.render('index', {
        title: 'Test new',
    });
};