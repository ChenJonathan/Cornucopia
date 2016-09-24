var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  user: String,
  password: String,
  points: Number,
  recipesSubmitted: [Number],
  recipesSaved: [Number],
  recipesHighlighted: [Number]
});

module.exports = mongoose.model('User', userSchema);
