exports.seed = (knex, Promise) => {
  return knex.raw('DELETE FROM "category"; ALTER SEQUENCE category_id_seq RESTART WITH 7;')
    .then(() => {
      let categories = [{
        id: 1,
        category: 'Normal'
      }, {
        id: 2,
        category: 'Daydream'
      }, {
        id: 3,
        category: 'Lucid'
      }, {
        id: 4,
        category: 'Vivid'
      }, {
        id: 5,
        category: 'Nightmare'
      }, {
        id: 6,
        category: 'Prophetic'
      }];
      return knex('category').insert(categories);
    });
};
