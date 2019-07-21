const mongoose = require("mongoose");
const { genreSchema } = require("../genres/genres.schema");

const Game = mongoose.model(
  "Game",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 200
    },
    genres: [genreSchema],
    description: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 200
    },
    ageRating: {
      type: Number
    }
  })
);

exports.Game = Game;
