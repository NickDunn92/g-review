const mongoose = require("mongoose");
const { genreSchema } = require("../genres/genres.schema");

const gameSchema = new mongoose.Schema({
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
});

const Game = mongoose.model("Game", gameSchema);

exports.Game = Game;
exports.gameSchema = gameSchema;
