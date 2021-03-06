
exports.up = function(knex, Promise) {
    const create = knex.schema.createTable('comments', commentTable => {
        commentTable.increments('comment_id').primary();
        commentTable.string('author').references('username').inTable('users');
        commentTable.integer('article_id').references('article_id').inTable('articles');
        commentTable.integer('votes').defaultsTo(0);
        commentTable.timestamp('created_at').defaultsTo(knex.fn.now());
        commentTable.text('body').notNullable();
    });
    if (process.env.LOG_SQL === 'true') console.log(create.toString());
    return create;
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('comments');  
};
