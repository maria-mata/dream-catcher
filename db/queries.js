const knex = require('./knex')

module.exports = {

  getDreamsByUserId: userId => {
    return knex('dream').where('dream.user_id', userId)
      .join('category', 'dream.category_id', 'category.id')
      .select('dream.*', 'category.name AS category_name')
  },

  addDream: dream => {
    return knex('dream').insert(dream).returning('*')
  },

  getDreamById: id => {
    return knex('dream').where('dream.id', id)
      .join('category', 'dream.category_id', 'category.id')
      .select('dream.*', 'category.name AS category_name')
  },

  editDream: (id, dream) => {
    return knex('dream').where('dream.id', id)
      .update(dream)
      .returning('*')
  },

  deleteDream: id => {
    return knex('dream').where('dream.id', id)
      .del().returning('*')
  }
};
