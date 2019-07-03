const { Genre } = require('./genres.schema');

exports.getGenres = async () => {
    const genres = await Genre.find();
    return genres;
}

exports.addGenre = async (name) => {
    const genre = new Genre({
      name
    });

    await genre.save();
    return genre;
}