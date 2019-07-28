const express = require("express");
const router = express.Router();
const { getUser, getUsers, updateUser, addUser } = require("./users.service");

router.get("/", async (req, res) => {
  const users = await getUsers();
  res.send(users);
});

router.post("/", async (req, res) => {
  const { username, email, firstname, lastname, dateOfBirth } = req.body;
  let dob = new Date(dateOfBirth);
  const user = await addUser(username, email, firstname, lastname, dob);
  res.send(user);
});

router.put("/:id", async (req, res) => {
  const { username, email, firstname, lastname, dateOfBirth } = req.body;

  const user = await updateUser(req.params.id, {
    username,
    email,
    firstname,
    lastname,
    dateOfBirth
  });

  if (!user)
    return res.status(404).send("The user with the given ID was nout found.");

  res.send(user);
});

router.get("/:id", async (req, res) => {
  const user = await getUser(req.params.id);

  if (!user)
    return res.status(404).send("The user with the given ID was not found");

  res.send(user);
});

module.exports = router;
