const mongoose = require('mongoose');

const Game = mongoose.model('Game', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 200
  }
}));

exports.Game = Game;