var mongoose = require('mongoose');

var sendJSONResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.recipesGetById = function(req, res) {
    sendJSONResponse(res, 200, "Test " + req.params.recipeId);
};

module.exports.recipesCreate = function(req, res) {
    sendJSONResponse(res, 200, "Test create");
};