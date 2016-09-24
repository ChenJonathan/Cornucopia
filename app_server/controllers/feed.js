var request = require('request');

module.exports.feedList = function(req, res) {
  request.get('http://localhost:3000/api/recipe', function(err, response) {
    res.send(response.body);
  });
};
