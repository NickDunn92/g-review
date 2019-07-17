const express = require("express");
const router = express.Router();
const { getUser, getUsers, addUser } = require("./users.service");

router.get("/", async (req, res) => {
  const users = await getUsers();
  res.send(users);
});

router.post("/", async (req, res) => {
  const { username, email, firstname, lastname, age } = req.body;
  const user = await addUser(username, email, firstname, lastname, age);
  res.send(user);
});

router.get("/:id", async (req, res) => {
  const user = await getUser(req.params.id);

  if (!user)
    return res.status(404).send("The user with the given ID was not found");

  res.send(user);
});

module.exports = router;
