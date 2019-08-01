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

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const game = await getGame(id);

    if (!game)
      return res.status(404).send("The movie with the given ID was not found.");

    res.send(game);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, genres, description, ageRating } = req.body;

    const genreObjects = [];

    genres.map(async g => {
      let genre = await getGenre(g);
      genreObjects.push(genre);
    });

    const game = await addGame(name, genreObjects, description, ageRating);

    res.send(game);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, genres, description, ageRating } = req.body;

    const genreObjects = [];

    genres.map(async g => {
      let genre = await getGenre(g);
      genreObjects.push(genre);
    });

    const game = await updateGame(id, {
      name,
      genres: genreObjects,
      description,
      ageRating
    });

    if (!game)
      return res.status(404).send("The game with the given ID was not found.");

    res.send(game);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await removeGame(id);

    res.status(200).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
