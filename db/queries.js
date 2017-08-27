const knex = require('./knex')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
  // existingUser: user => {
  //   let username = return knex('user').where('username', user.username)
  //   let email = return knex('user').where('email', user.email)
  //   return Promise.all(username, email)
  //     .then((username, email) => {
  //       if
  //     })
  // },
  //
  // addNewUser: user => {
  //   return knex('user').insert(user).returning('*')
  // },

  getDreams: () => {
    return knex('dream')
    .join('category', 'dream.category_id', 'category.id')
    .select('dream.*', 'category.name AS category_name')
  },

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
