var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  user: String,
  password: String,
  points: Number,
  recipesSubmitted: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Recipe'
  }],
  recipesSaved: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Recipe'
  }],
  recipesHighlighted: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Recipe'
  }]
});

module.exports = mongoose.model('User', userSchema);
