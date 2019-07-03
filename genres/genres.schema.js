const mongoose = require('mongoose');

const Genre = mongoose.model('Genre', new mongoose.schema({
  name: {
      type: String,
      required: true
  }
}));

exports.Genre = Genre;