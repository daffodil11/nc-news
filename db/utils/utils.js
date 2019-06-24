exports.formatDate = list => {
    return list.map(obj => ({...obj, created_at: new Date(obj.created_at)}));
};

exports.makeRefObj = list => {
    return {};
};

exports.formatComments = (comments, articleRef) => {};
