const express = require("express");
const router = express.Router();
const {
  getComment,
  addComment,
  updateComment,
  removeComment
} = require("./comments.service");
const { getUser } = require("../users/users.service");

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await getComment(id);

    if (!comment)
      return res
        .status(404)
        .send("The comment with the given ID was not found");

    res.send(comment);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const { userId, datePosted, content } = req.body;

    if (!userId || userId === "")
      return res.status(404).send("No user ID found");

    const userObject = await getUser(userId);

    if (userObject === null) return res.status(404).send("No user found");

    const comment = await addComment(userObject, datePosted, content);

    res.status(201).send(comment);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, datePosted, content } = req.body;

    const userObject = await getUser(userId);

    const comment = await updateComment(id, {
      userObject,
      datePosted,
      content
    });

    if (!comment) return res.status(404).send("Unable to update comment");

    res.send(comment);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await removeComment(id);

    res.status(200).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
