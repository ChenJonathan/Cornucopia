var router = require('router');

module.exports.profileUser = function(req, res) {
  router.get('http://localhost:3000/api/user/' + req.params.userId, function (err, response) {
    if (err) {
      console.log(err);
      next(err);
    }
    console.log(response);
    res.render('profile\\profile', {
        title: 'Test id'  + req.params.userId
    });
  });
};

module.exports.profileRecipes = function(req, res) {
  router.get('http://localhost:3000/user/' + req.params.userId + '/submitted', function(err, response) {
    if (err) {
      console.log(err);
      next(err);
    }
    console.log(response);
    res.render('profile\\recipes', {
      title: 'Test id' + req.params.userId
    });
  });
};

module.exports.profileGroceries = function(req, res) {
    router.get('http://localhost:3000/api/user/' + req.params.userId, function (err, response) {
        if (err) {
            console.log(err);
            next(err);
        }
        console.log(response);
        res.render('profile\\groceries', {
            title: 'Test id' + req.params.userId
        });
    });
};
