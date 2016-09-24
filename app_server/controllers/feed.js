/* GET 'location list' page. */
module.exports.feedList = function(req, res) {
    res.render('feed/feed', {
        title: 'Test list',
    });
};
