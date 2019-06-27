const { updateCommentVotes } = require('../models/comments');

exports.patchCommentVotes = (req, res, next) => {
    const { comment_id } = req.params;
    updateCommentVotes(comment_id, req.body)
    .then(comment => {
        res.status(200).send({ comment });
    })
    .catch(next);
};