exports.up = function(knex, Promise) {
  const alter = knex.schema.alterTable('comments', commentTable => {
    commentTable.dropForeign('article_id');
    commentTable
      .foreign('article_id')
      .references('article_id')
      .inTable('articles')
      .onDelete('CASCADE');
  });
  if (process.env.LOG_SQL === 'true') console.log(alter.toString());
  return alter;
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('comments', commentTable => {
    commentTable.dropForeign('article_id');
    commentTable
      .foreign('article_id')
      .references('article_id')
      .inTable('articles');
  });
};
