const bcrypt = require('bcrypt');

exports.seed = (knex, Promise) => {
  return knex.raw('DELETE FROM "user"; ALTER SEQUENCE user_id_seq RESTART WITH 4;')
    .then(() => {
      let users = [{
        id: 1,
        username: 'maria',
        email: 'mmata@gmail.com',
        password: bcrypt.hashSync('purple21', 10)
      }, {
        id: 2,
        username: 'greg',
        email: 'gthrock@gmail.com',
        password: bcrypt.hashSync('green32', 10)
      }, {
        id: 3,
        username: 'erin',
        email: 'edtrch@gmail.com',
        password: bcrypt.hashSync('yellow15', 10)
      }];
      return knex('user').insert(users);
    });
};
