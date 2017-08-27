exports.seed = (knex, Promise) => {
  return knex.raw('DELETE FROM "dream"; ALTER SEQUENCE dream_id_seq RESTART WITH 4;')
    .then(() => {
      let dreams = [{
        id: 1,
        date: knex.raw('now()'),
        description: "I am at the dentist. He is tightening my braces and I can feel the pain in my teeth. I wake up and realized I haven't had braces for years.",
        user_id: 1, // maria
        category_id: 4 // vivid
      }, {
        id: 2,
        date: knex.raw('now()'),
        description: "I get out of bed and find myself in the middle of the office at work. I don't know how I (or my bed) got there and I'm not ready for work!",
        user_id: 2, // greg
        category_id: 1 // normal
      }, {
        id: 3,
        date: knex.raw('now()'),
        description: "I am being chased by an attacker, so I try to run but my legs feel heavy and I cannot move them fast enough. He is about to catch me until I wake up in a panic...",
        user_id: 3, // erin
        category_id: 5 // nightmare
      }];
      return knex('dream').insert(dreams);
    });
};
