/* GET 'location list' page. */
module.exports.recipeList = function(req, res) {
    res.render('index', { //this is the name of the jade file we're pushing stuff too
        title: 'Test list', //this is the list of json that is being sent to the page
    });
};