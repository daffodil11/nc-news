
exports.up = function(knex, Promise) { 
    return knex.schema.createTable('articles', articleTable => {
        articleTable.increments('article_id');
        articleTable.string('title').notNullable();
        articleTable.string('body').notNullable();
        articleTable.integer('votes').defaultTo(0);
        articleTable.string('topic').references('slug').inTable('topics');
        articleTable.string('author').references('username').inTable('users');
        articleTable.timestamp('created_at').defaultTo(knex.fn.now());
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('articles');  
};
