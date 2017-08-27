const knex = require('./knex')

module.exports = {
  getDreamsByUserId: userId => {
    return knex('dream').where('dream.user_id', userId)
      .join('category', 'dream.category_id', 'category.id')
      .select('dream.*', 'category.category')
  } // add more queries here
}
