const { Comment } = require("./comments.schema");

exports.getComment = async id => {
  const comment = await Comment.findById(id);
  return comment;
};

exports.addComment = async (user, datePosted, content) => {
  const comment = new Comment({
    user,
    datePosted,
    content
  });

  await comment.save();
  return comment;
};

exports.updateComment = async (id, updatedComment) => {
  await Comment.findByIdAndUpdate(id, updatedComment);
  return updatedComment;
};

exports.removeComment = async id => {
  await Comment.findByIdAndRemove(id);
  return;
};