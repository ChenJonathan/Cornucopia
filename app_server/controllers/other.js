module.exports.home = function(req, res) {
    res.render('other/home', {
        title: 'Homepage',
        input1: 'Login Button',
        input2: 'Password Button',
    });
};

module.exports.login = function(req, res) {
    res.render('other/login', {
        title: 'Login',
        username: 'Username:',
        password: 'Password:',
    });
};

module.exports.register = function(req, res) {
    res.render('other/registration', {
        title: 'New User Registration',
        newUsername: 'New Username:',
        newPassword: 'New Password:',
        verifyPassword: 'Verify Password',
    });
};