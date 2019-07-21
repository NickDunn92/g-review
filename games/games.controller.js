const express = require("express");
const router = express.Router();
const {
  getGames,
  getGame,
  addGame,
  updateGame,
  removeGame
} = require("./games.service");
const { getGenre } = require("../genres/genres.service");

router.get("/", async (req, res) => {
  const games = await getGames();
  res.send(games);
});

router.post("/", async (req, res) => {
  const { name, genres, description, ageRating } = req.body;

  const genreObjects = [];

  genres.map(async g => {
    let genre = await getGenre(g);
    genreObjects.push(genre);
  });

  const game = await addGame(name, genreObjects, description, ageRating);

  res.send(game);
});

router.put("/:id", async (req, res) => {
  const { name, genres, description, ageRating } = req.body;

  const genreObjects = [];

  genres.map(async g => {
    let genre = await getGenre(g);
    genreObjects.push(genre);
  });

  const game = await updateGame(req.params.id, {
    name,
    genres: genreObjects,
    description,
    ageRating
  });

  if (!game)
    return res.status(404).send("The game with the given ID was not found.");

  res.send(game);
});

router.delete("/:id", async (req, res) => {
  await removeGame(req.params.id);

  res.status(200).send();
});

router.get("/:id", async (req, res) => {
  const game = await getGame(req.params.id);

  if (!game)
    return res.status(404).send("The movie with the given ID was not found.");

  res.send(game);
});

module.exports = router;
