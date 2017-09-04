const knex = require('./knex')

module.exports = {

  getDreamsByUserId: userId => {
    return knex('dream').where('dream.user_id', userId)
      .join('category', 'dream.category_id', 'category.id')
      .select('dream.*', 'category.name AS category_name')
  },

  getCategories: () => {
    return knex('category')
  },

  addDream: dream => {
    return knex('dream').insert(dream).returning('*')
  }
};
