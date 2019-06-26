
exports.up = function(knex, Promise) { 
    const create = knex.schema.createTable('users', userTable => {
        userTable.string('username').primary();
        userTable.string('avatar_url');
        userTable.string('name').notNullable();
    });
    if (process.env.LOG_SQL === 'true') console.log(create.toString());
    return create;
};

exports.down = function(knex, Promise) { 
    return knex.schema.dropTable('users');
};
