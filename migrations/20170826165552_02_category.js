exports.up = function(knex, Promise) {
  return knex.schema.createTable('category', (table) => {
  table.increments();
  table.string('category').notNullable().unique();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('category');
};
