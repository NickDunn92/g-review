const { Genre } = require("./genres.schema");

exports.getGenre = async id => {
  const genre = await Genre.findById(id);
  return genre;
};

exports.addGenre = async name => {
  const genre = new Genre({
    name
  });

  await genre.save();
  return genre;
};
