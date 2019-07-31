const express = require("express");
const router = express.Router();
const { getGenre, getGenres, addGenre } = require("./genres.service");

router.get("/", async (req, res) => {
  const genres = await getGenres();
  res.send(genres);
});

router.get("/:id", async (req, res) => {
  const genre = await getGenre(req.params.id);
  if (!genre) res.status(404).send('Unable to find genre with this ID!');

  res.send(genre);
});

router.post("/", async (req, res) => {
  const { name } = req.body;
  const genre = await addGenre(name);
  res.send(genre);
});

module.exports = router;
