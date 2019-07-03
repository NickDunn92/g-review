const mongoose = require('mongoose');

const Genre = mongoose.model('Genre', new mongoose.Schema({
  name: {
      type: String,
      required: true
  }
}));

exports.Genre = Genre;