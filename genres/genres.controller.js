const express = require("express");
const router = express.Router();
const { getGenres, addGenre } = require("./genres.service");

router.get("/", async (req, res) => {
  const genres = await getGenres();
  res.send(genres);
});

router.post("/", async (req, res) => {
  const { name } = req.body;
  const genre = await addGenre(name);
  res.send(genre);
});

module.exports = router;
