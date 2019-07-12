const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 10
  },
  email: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 10
  },
  lastname: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 10
  }
}));

exports.User = User;