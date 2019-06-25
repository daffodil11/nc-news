exports.formatDate = list => {
    return list.map(obj => ({...obj, created_at: new Date(obj.created_at)}));
};

exports.makeRefObj = (list, key = 'title', value = 'article_id') => {
    return list.reduce((refObj, obj) => {
        return {...refObj, [obj[key]]: obj[value]};
    }, {});
};

exports.formatComments = (comments, articleRef) => {};
