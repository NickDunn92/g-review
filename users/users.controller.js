const express = require('express');
const router = express.Router();
const { getUSers, addUSer, updateUser, removeUser } = require('./users.service');

router.get('/', async (req, res) => {
  const users = await getUSers();
  res.send(users);
});

router.post('/', async (req, res) => {
  const { username, email, firstname, lastname } = req.body;
  const user = await addUSer(username, email, firstname, lastname);
  res.send(user);
});

router.get('/:id', async (req, res) => {
  const user = await Users.findById(req.params.id);

  if(!user) return res.status(404).send('The user with the given ID was not found');

  res.send(user);
});

module.exports = router;