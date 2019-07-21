const { Game } = require("./games.schema");

exports.getGames = async () => {
  const games = await Game.find();
  return games;
};

exports.getGame = async id => {
  const game = await Game.findById(id);
  return game;
};

exports.addGame = async (name, genres, description, ageRating) => {
  const game = new Game({
    name,
    genres,
    description,
    ageRating
  });

  await game.save();
  return game;
};

exports.updateGame = async (id, updatedGame) => {
  await Game.findByIdAndUpdate(id, updatedGame);
  return updatedGame;
};

exports.removeGame = async id => {
  const game = await Game.findByIdAndRemove(id);
  return game;
};
