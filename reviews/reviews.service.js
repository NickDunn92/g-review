const { Review } = require("./reviews.schema");

exports.getReviews = async () => {
  const reviews = await Review.find();
  return reviews;
};

exports.getReview = async id => {
  const review = await Review.findById(id);
  return review;
};

exports.addReview = async (games, users, content, datePosted) => {
  const review = new Review({
    games,
    users,
    content,
    datePosted
  });

  await review.save();
  return review;
};

exports.updateReview = async (id, updatedReview) => {
  await Review.findByIdAndUpdate(id, updatedReview);
  return updatedReview;
};

exports.removeReview = async id => {
  const review = await Review.findByIdAndRemove(id);
  return review;
};
