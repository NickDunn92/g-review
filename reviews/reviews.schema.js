const mongoose = require("mongoose");
const { gameSchema } = require("../games/games.schema");
const { userSchema } = require("../users/users.schema");

const Review = mongoose.model(
  "Review",
  new mongoose.Schema({
    games: [gameSchema],
    user: [userSchema],
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
  })
);

exports.Review = Review;
