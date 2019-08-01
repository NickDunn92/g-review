const mongoose = require('mongoose');
const { userSchema } = require("../users/users.schema");

const commentSchema = new mongoose.Schema({
  user: userSchema,
  content: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 5000
  },
  datePosted: {
    type: Date,
    required: true
  }
});

const Comment = mongoose.model('Comment', commentSchema);

exports.Comment = Comment;
exports.commentSchema = commentSchema;