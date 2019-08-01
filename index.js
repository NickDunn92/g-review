const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

mongoose
  .connect("mongodb://localhost/greview")
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB..."));

const gameRoutes = require("./games/games.controller");
const genreRoutes = require("./genres/genres.controller");
const userRoutes = require("./users/users.controller");
const reviewRoutes = require("./reviews/reviews.controller");
const commentRoutes = require("./comments/comments.controller");

app.use(bodyParser.json());
app.use(express.json());
app.use("/games", gameRoutes);
app.use("/genres", genreRoutes);
app.use("/users", userRoutes);
app.use("/reviews", reviewRoutes);
app.use("/comments", commentRoutes);

app.listen(8080, () => {
  console.log("Listening on 8080");
});
