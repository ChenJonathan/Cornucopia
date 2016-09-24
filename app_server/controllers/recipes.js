/* GET 'location list' page. */
module.exports.recipeInfo = function(req, res) {
    res.render('/recipes/info', {
        title: 'Test ' + req.params.recipeId,
    });
};

module.exports.recipeCreate = function(req, res) {
    res.render('/recipes/create', {
        title: 'Test new',
    });
};