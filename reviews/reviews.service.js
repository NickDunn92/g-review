const { Review } = require("./reviews.schema");

exports.getReviews = async () => {
  const reviews = await Review.find();
  return reviews;
};

exports.getReview = async id => {
  const review = await Review.findById(id);
  return review;
};

exports.addReview = async (game, user, content, datePosted) => {
  const review = new Review({
    game,
    user,
    content,
    datePosted: new Date()
  });

  await review.save();
  return review;
};

exports.updateReview = async (id, updatedReview) => {
  await Review.findByIdAndUpdate(id, updatedReview);
  return updatedReview;
};

exports.removeReview = async id => {
  await Review.findByIdAndRemove(id);
  return;
};
