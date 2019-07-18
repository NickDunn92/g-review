const { Game } = require("./games.schema");

exports.getGames = async () => {
  const games = await Game.find();
  return games;
};

exports.addGame = async (name, genre) => {
  const game = new Game({
    name,
    genre
  });

  await game.save();
  return game;
};

exports.updateGame = async (id, updatedGame) => {
  await Game.findByIdAndUpdate({ id }, updatedGame);
  return updatedGame;
};

exports.removeGame = async id => {
  const game = await Game.findByIdAndRemove(id);
  return game;
};
