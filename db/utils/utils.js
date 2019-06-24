exports.formatDate = list => {
    return list.map(obj => ({...obj, created_at: new Date(obj.created_at)}));
};

exports.makeRefObj = list => {};

exports.formatComments = (comments, articleRef) => {};
