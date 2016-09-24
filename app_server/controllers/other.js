module.exports.home = function(req, res) {
    res.render('other\\home', {
        title: 'Homepage',
        input1: 'Login Button',
        input2: 'Password Button',
    });
};

module.exports.login = function(req, res) {
    router.get('http://localhost:3000/user/' + req.params.userId + '/'req.params.password, function (err, response) {
        if (err) {
            console.log(err);
            next(err);
        }
        if (!(assert.equal(response.body.user, req.params.userId) && assert.equal(response.body.password, req.params.password))) {
            alert("Incorrect combination of username and password");
        }
    }
    res.render('other\\login', {
        title: 'Login',
        username: 'Username:',
        password: 'Password:',
    });
};

module.exports.register = function(req, res) {
    router.get('http://localhost:3000/user/' + req.params.userId + '/'req.params.password + '/'req.params.vpassword, function (err, response) {
        if (err) {
            console.log(err);
            next(err);
        }
        if (!(assert.equal(req.params.vpassword, req.params.password))) {
            alert("Passwords do not match");
        }
    }
    res.render('other\\registration', {
        title: 'New User Registration',
        newUsername: 'New Username:',
        newPassword: 'New Password:',
        verifyPassword: 'Verify Password',
    });
};