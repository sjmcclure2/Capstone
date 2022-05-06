/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex.schema.raw('TRUNCATE locations CASCADE');
  await knex('locations').del();

  let locs = [];

  for (const letter of ['A', 'B']) {
    for (let i = 1; i <= 26; i++) {
      locs.push(letter + i);
    };
  };

  for (const letter of ['D', 'H', 'HS']) {
    for (let i = 1; i <= 20; i++) {
      locs.push(letter + i);
    };
  };

  for (const letter of ['Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X']) {
    for (let i = 1; i <= 4; i++) {
      locs.push(letter + i);
    };
  };

  await knex('locations').insert(locs.map(str => ({ name: str })));
};
