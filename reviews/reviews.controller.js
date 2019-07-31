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
  const review = await getReview(req.params.id);

  if (!review)
    return res.status(404).send("The review with the given ID was not found");
  
  res.send(review);
});

router.post("/", async (req, res) => {
  const { gameId, userId, content, datePosted } = req.body;

  if (!gameId) return res.status(404).send("No game ID found");

  if (!userId || userId === "") return res.status(404).send("No user ID found");

  const gameObject = await getGame(gameId);

  const userObject = await getUser(userId);

  const review = await addReview(gameObject, userObject, content, datePosted);

  res.status(201).send(review);
});

router.put("/:id", async (req, res) => {
  const { gameId, userId, content, datePosted } = req.body;

  const gameObject = await getGame(gameId);

  const userObject = await getUser(userId);

  const review = await updateReview(req.params.id, {
    gameObject,
    userObject,
    content,
    datePosted
  });

  if (!review)
    return res.status(404).send("The review with the given ID was not found");

  res.send(review);
});

router.delete("/:id", async (req, res) => {
  await removeReview(req.params.id);

  res.status(200).send();
});

module.exports = router;
