
exports.up = function(knex, Promise) {
    const create = knex.schema.createTable('topics', topicsTable => {
        topicsTable.string('slug').primary();
        topicsTable.string('description').notNullable();
    });
    if (process.env.LOG_SQL === 'true') console.log(create.toString());
    return create;
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('topics');  
};
