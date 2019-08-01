const express = require("express");
const router = express.Router();
const { getUser, getUsers, updateUser, addUser } = require("./users.service");

router.get("/", async (req, res) => {
  try {
    const users = await getUsers();
    res.send(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUser(id);

    if (!user)
      return res.status(404).send("The user with the given ID was not found");

    res.send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const { username, email, firstname, lastname, dateOfBirth } = req.body;
    let dob = new Date(dateOfBirth);
    const user = await addUser(username, email, firstname, lastname, dob);

    res.send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, firstname, lastname, dateOfBirth } = req.body;

    const user = await updateUser(id, {
      username,
      email,
      firstname,
      lastname,
      dateOfBirth
    });

    if (!user)
      return res.status(404).send("The user with the given ID was nout found.");

    res.send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
