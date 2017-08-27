const knex = require('./knex')

module.exports = {
  getDreams: () => {
    return knex('dream')
    .join('category', 'dream.category_id', 'category.id')
    .select('dream.*', 'category.category')
  },
  getDreamsByUserId: userId => {
    return knex('dream').where('dream.user_id', userId)
      .join('category', 'dream.category_id', 'category.id')
      .select('dream.*', 'category.category')
  },
  addDream: dream => {
    return knex('dream').insert(dream).returning('*')
  } // add more queries here
}
