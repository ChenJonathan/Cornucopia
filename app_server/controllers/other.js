/* GET 'about' page. */
module.exports.home = function(req, res) {
    res.render('index', {
        title: 'Homepage',
        input1: 'Login Button',
        input2: 'Password Button',
    });
};

module.exports.login = function(req, res) {
    res.render('index', {
        loginTitle: 'Login',
        username: 'Username:',
        password: 'Password:',
    });
};

module.exports.register = function(req, res) {
    res.render('index', {
        registerTitle: 'New User Registration',
        newUsername: 'New Username:',
        newPassword: 'New Password:',
        verifyPassword: 'Verify Password',
    });
};