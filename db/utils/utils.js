exports.formatDate = list => {
  return list.map(obj => ({ ...obj, created_at: new Date(obj.created_at) }));
};

exports.makeRefObj = (list, key = 'title', value = 'article_id') => {
  return list.reduce((refObj, obj) => {
    return { ...refObj, [obj[key]]: obj[value] };
  }, {});
};

exports.formatComments = (comments, articleRef) => {
  return comments.map(({ created_by, belongs_to, created_at, ...newObj }) => {
    return {
      ...newObj,
      author: created_by,
      article_id: articleRef[belongs_to],
      created_at: new Date(created_at)
    };
  });
};

exports.validateOrderKey = (orderKey, columns) => {
  return new Promise((resolve, reject) => {
    if (!columns.includes(orderKey)) {
      reject({
        status: 400,
        msg: 'Bad request: Invalid sort_by value'
      });
    } else {
      resolve();
    }
  });
};
