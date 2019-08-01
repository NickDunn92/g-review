const express = require("express");
const router = express.Router();
const { getGenre, getGenres, addGenre } = require("./genres.service");

router.get("/", async (req, res) => {
  try {
    const genres = await getGenres();

    res.send(genres);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const genre = await getGenre(id);

    if (!genre) res.status(404).send("Unable to find genre with this ID!");

    res.send(genre);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    const genre = await addGenre(name);

    res.send(genre);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
