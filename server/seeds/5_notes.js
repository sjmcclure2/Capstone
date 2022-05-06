const { faker } = require('@faker-js/faker');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('notes').del();

  const jobs = await knex('imds').select('jcn');

  for (let i = 0; i < 100; i++) {
    const jcn = faker.helpers.arrayElement(jobs).jcn;
    const note = faker.lorem.lines();
    const is_active =  faker.datatype.boolean()
    
    await knex('notes').insert(
      { jcn,
        note,
        is_active }
    )
  }
};
