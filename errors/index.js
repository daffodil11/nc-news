exports.send405Error = (req, res, next) => {
    res.status(405).send({ msg: 'Method not allowed'});
};

exports.handlePSQL400Errors = (err, req, res, next) => {
    const psqlCodes = ['23503'];
    if (err.code && psqlCodes.includes(err.code)) {
        if (err.constraint === 'comments_author_foreign') res.status(400).send({ msg: 'Bad request: Only an existing user can post a comment'})
        else next(err);
    } else next(err);
}

exports.handleCustomErrors = (err, req, res, next) => {
    if (err.status) res.status(err.status).send({ msg: err.msg });
    else next(err);
}

exports.handle500Errors = (err, req, res, next) => {
    console.log(err);
    res.status(500).send({ msg: 'Internal Server Error'});
};