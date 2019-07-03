const { Game } = require('./games.schema');

exports.getGames = async function(){
  const games = await Game.find();
  return games;
}

exports.addGame = async (name) => {
  const game = new Game({
    name
  });

  await game.save();
  return game;
}

exports.updateGame = async function(id,name){
  const game = await Game.findByIdAndUpdate(id, name);
  return game;
}

exports.removeGame = async (id) => {
  const game = await Game.findByIdAndRemove(id);
  return;
}