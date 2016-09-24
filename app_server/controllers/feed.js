/* GET 'location list' page. */
module.exports.feedList = function(req, res) {
    res.render('index', {
        title: 'Test list',
    });
};
