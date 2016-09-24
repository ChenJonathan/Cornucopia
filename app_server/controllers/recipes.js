/* GET 'location list' page. */
module.exports.recipeList = function(req, res) {
    res.render('index', {
        title: 'Test list',
    });
};