/* GET 'location list' page. */
module.exports.groceryList = function(req, res) {
    res.render('index', {
        title: 'Test list',
    });
};
