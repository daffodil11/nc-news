exports.up = function(knex, Promise) {
  return knex.schema.alterTable('comments', commentTable => {
    commentTable.dropForeign('article_id');
    commentTable
      .foreign('article_id')
      .references('article_id')
      .inTable('articles')
      .onDelete('CASCADE');
  });
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
