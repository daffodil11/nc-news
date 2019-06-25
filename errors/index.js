exports.send405Error = (req, res, next) => {
    res.status(405).send({ msg: 'Method not allowed'});
};

exports.handle500Errors = (err, req, res, next) => {
    console.log(err);
    res.status(500).send({ msg: 'Internal Server Error'});
}