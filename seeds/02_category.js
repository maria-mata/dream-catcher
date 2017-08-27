exports.seed = (knex, Promise) => {
  return knex.raw('DELETE FROM "category"; ALTER SEQUENCE category_id_seq RESTART WITH 7;')
    .then(() => {
      let categories = [{
        id: 1,
        name: 'Normal',
        description: "These are your bog standard dreams where you have no idea you're dreaming until you wake up. In a typical dream, you could be doing a rap duet with the Pope and think nothing of it. You accept your dream reality as it is."
      }, {
        id: 2,
        name: 'Daydream',
        description: "You spend an average of 70-120 minutes a day daydreaming or fantasizing from a perspective that transcends normal perception. Between consciousness and the sleep state is an area that allows the imagination to wander. As your level of awareness decreases, you lose your sense of self. You may revisit the past, or explore the future, and in doing so, approach the border of the dreamscape. All the while, consciousness keeps pulling you back into the present."
      }, {
        id: 3,
        name: 'Lucid',
        description: "Lucid dreams occur when you ‘wake up’ while dreaming. Sometimes this sudden sense of knowing you are dreaming allows you to do fantastic things like fly over the houses you see. Many people actually wake themselves up within the dream to remain in this lucid state to explore how they can influence dreams."
      }, {
        id: 4,
        name: 'Vivid',
        description: "One characteristic of vivid dreams is they seem very real. More complex emotions and thoughts on a person's mind are what cause vivid dreams. Because of the realness of the vivid dream experience, often when waking from a vivid dream, it takes a person a few moments to realize they were dreaming."
      }, {
        id: 5,
        name: 'Nightmare',
        description: "The nightmare often causes you to wake up in a state of panic with your heart racing. In nightmares, you don't know you're dreaming. So the unconscious mind processes everything as if it were really happening. Some nightmares can be so vivid that the sensory system is triggered and you can feel certain types of pain. It can be very unnerving."
      }, {
        id: 6,
        name: 'Prophetic',
        description: "Also referred to as precognitive dreams, prophetic dreams are believed to be a form of extra-sensory perception (ESP) in which a person is said to perceive information about places or events through paranormal means before they actually happen."
      }];
      return knex('category').insert(categories);
    });
};
