const { fetchCommentById, updateCommentVotes, deleteComment } = require('../models/comments');

exports.getCommentById = (req, res, next) => {
    const { comment_id } = req.params;
    fetchCommentById(comment_id)
    .then(comment => {
        res.status(200).send({ comment });
    })
    .catch(next);
};

exports.patchCommentVotes = (req, res, next) => {
  const { comment_id } = req.params;
  updateCommentVotes(comment_id, req.body)
    .then(comment => {
      res.status(200).send({ comment });
    })
    .catch(next);
};

exports.removeComment = (req, res, next) => {
  const { comment_id } = req.params;
  deleteComment(comment_id).then(() => {
    res.status(204).end();
  });
};
