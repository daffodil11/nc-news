
exports.up = function(knex, Promise) {
    return knex.schema.createTable('comments', commentTable => {
        commentTable.increments('comment_id').primary();
        commentTable.string('author').references('username').inTable('users');
        commentTable.integer('article_id').references('article_id').inTable('articles');
        commentTable.integer('votes').defaultsTo(0);
        commentTable.timestamp('created_at').defaultsTo(knex.fn.now());
        commentTable.string('body').notNullable();
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('comments');  
};
