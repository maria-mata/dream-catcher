exports.up = function(knex, Promise) {
  return knex.schema.createTable('category', (table) => {
  table.increments();
  table.string('name').notNullable().unique();
  table.text('description').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('category');
};
