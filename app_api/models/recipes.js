var mongoose = require('mongoose');

// Create schemas here
var recipeSchema = new mongoose.Schema({
  name: String,
  instructions: [String],
  rating: Number,
  ingredients: [String]
});

var Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
