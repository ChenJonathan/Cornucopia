/* GET 'about' page. */
module.exports.home = function(req, res) {
    res.render('index', {
        title: 'Test home',
    });
};