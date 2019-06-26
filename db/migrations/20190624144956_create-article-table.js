
exports.up = function(knex, Promise) { 
    const create = knex.schema.createTable('articles', articleTable => {
        articleTable.increments('article_id');
        articleTable.string('title').notNullable().unique();
        articleTable.text('body').notNullable();
        articleTable.integer('votes').defaultTo(0);
        articleTable.string('topic').references('slug').inTable('topics');
        articleTable.string('author').references('username').inTable('users');
        articleTable.timestamp('created_at').defaultTo(knex.fn.now());
    });
    if (process.env.LOG_SQL === 'true') console.log(create.toString());
    return create;
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('articles');  
};
