const express = require('express');
const router = express.Router();
const { getGames, addGame, updateGame, removeGame } = require('./games.service');

router.get('/', async (req, res) => {
  const games = await getGames();
  res.send(games);
});

router.post('/', async (req, res) => {
  const { name } = req.body;
  const game = await addGame(name);
  res.send(game);
});

router.put('/:id', async (req, res) => {
  const game = await updateGame(req.params.id, { name: req.body.name }, {
    new: true
  });
  
  if (!game) return res.status(404).send('The game with the given ID was not found.'); 
    
  res.send(game);
});

router.delete('/:id', async (req, res) => {
  await removeGame(req.params.id);
    
  res.status(200).send();
});

router.get('/:id', async (req, res) => {
  const game = await Games.findById(req.params.id);

  if (!game) return res.status(404).send('The movie with the given ID was not found.');

  res.send(game);
});

module.exports = router;