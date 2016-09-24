var request = require('request');

module.exports.feedList = function(req, res) {
    res.render('feed/feed', {
        title: "Test"
    });
};
