/* GET 'location list' page. */
module.exports.recipeInfo = function(req, res) {
    res.render('/recipe/:recipeId', {
        title: 'Test ' + req.params.recipeId,
    });
};

module.exports.recipeCreate = function(req, res) {
    res.render('/recipes', {
        title: 'Test new',
    });
};