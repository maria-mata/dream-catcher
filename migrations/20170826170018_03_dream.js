exports.up = function(knex, Promise) {
  return knex.schema.createTable('dream', (table) => {
  table.increments();
  table.date('date').notNullable().defaultTo(new Date);
  table.text('description').notNullable();
  table.integer('user_id').references('user.id').unsigned().onDelete('cascade');
  table.integer('category_id').references('category.id').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('dream');
};
