const express = require("express");
const router = express.Router();
const {
  getReview,
  addReview,
  updateReview,
  removeReview
} = require("./reviews.service");
const { getUser } = require("../users/users.service");
const { getGame } = require("../games/games.service");

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const review = await getReview(id);

    if (!review)
      return res.status(404).send("The review with the given ID was not found");

    res.send(review);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const { gameId, userId, content, datePosted } = req.body;

    if (!gameId) return res.status(404).send("No game ID found");

    if (!userId || userId === "")
      return res.status(404).send("No user ID found");

    const gameObject = await getGame(gameId);

    const userObject = await getUser(userId);

    if (userObject === null) return res.status(404).send("No user found");

    const review = await addReview(gameObject, userObject, content, datePosted);

    res.status(201).send(review);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { gameId, userId, content, datePosted } = req.body;

    const gameObject = await getGame(gameId);

    const userObject = await getUser(userId);

    const review = await updateReview(id, {
      gameObject,
      userObject,
      content,
      datePosted
    });

    if (!review)
      return res.status(404).send("The review with the given ID was not found");

    res.send(review);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await removeReview(id);

    res.status(200).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
