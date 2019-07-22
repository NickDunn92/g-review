const express = require("express");
const router = express.Router();
const {
  getReviews,
  getReview,
  addReview,
  updateReview,
  removeReview
} = require("./reviews.service");
const { getUser } = require("../users/users.service");
const { getGame } = require("../games/games.service");

router.get("/:id", async (req, res) => {
  const reviews = await getReviews();
  res.send(reviews);
});

router.post("/", async (req, res) => {
  const { games, users, content, datePosted } = req.body;

  const gameObjects = [];

  games.map(async g => {
    let game = await getGame(g);
    gameObjects.push(game);
  });

  const userObjects = [];

  users.map(async u => {
    let user = await getUser(u);
    userObjects.push(user);
  });

  const review = await addReview(games, users, content, datePosted);

  res.send(review);
});

router.put("/:id", async (req, res) => {
  const { games, users, content, datePosted } = req.body;

  const gameObjects = [];

  games.map(async g => {
    let game = await getGame(g);
    gameObjects.push(game);
  });

  const userObjects = [];

  users.map(async u => {
    let user = await getUser(u);
    userObjects.push(user);
  });

  const review = await updateReview(req.params.id, {
    games,
    users,
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

router.get("/:id", async (req, res) => {
  const review = await getReview(req.params.id);

  if (!review)
    return res.status(404).send("The review with the given ID was not found.");

  res.send(review);
});

module.exports = router;
