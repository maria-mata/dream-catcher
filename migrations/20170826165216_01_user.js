exports.up = function(knex, Promise) {
  return knex.schema.createTable('user', (table) => {
  table.increments();
  table.string('username').notNullable().unique();
  table.string('email').notNullable().unique();
  table.string('password').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('user');
};
