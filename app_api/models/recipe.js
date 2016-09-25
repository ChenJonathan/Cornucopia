var mongoose = require('mongoose');

var recipeSchema = new mongoose.Schema({
  name: String,
  author: String,
  instructions: [String],
  rating: Number,
  ingredients: [String] });

module.exports = mongoose.model('Recipe', recipeSchema);
