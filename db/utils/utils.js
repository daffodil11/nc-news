exports.formatDate = list => {
    return list.map(obj => ({...obj, created_at: new Date(obj.created_at)}));
};

exports.makeRefObj = (list, key = 'title', value = 'article_id') => {
    return list.reduce((refObj, obj) => {
        return {...refObj, [obj[key]]: obj[value]};
    }, {});
};

exports.formatComments = (comments, articleRef) => {
    return comments.map(({ created_by, belongs_to, ...newObj }) => {
        newObj.author = created_by;
        newObj.article_id = articleRef[belongs_to];
        return newObj;
    });
};
