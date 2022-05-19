const { faker } = require('@faker-js/faker');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex.schema.raw('TRUNCATE imds CASCADE');
  await knex('imds').del();
  
  const aircraft = await knex('aircraft').select('tail_number');

  for (let i = 0; i < 200; i++) {
    const tail_number = faker.helpers.arrayElement(aircraft).tail_number;
    const mx_etic_start = faker.date.recent(30)
    const mx_etic = faker.date.soon(2, mx_etic_start)
    const discrepancy = faker.lorem.lines(2)
    const is_complete = faker.datatype.boolean();
    const corrective_action = is_complete ? faker.lorem.lines(3) : '';
    const symbol = faker.helpers.arrayElement(['X', '/', '-']);
    const wuc = faker.helpers.replaceSymbols('##?**');
    const shop = faker.random.alpha(5).toUpperCase();
    const prd = faker.datatype.boolean();
    const is_sched_insp = faker.datatype.boolean();
    
    await knex('imds').insert(
      { tail_number,
        mx_etic_start,
        mx_etic,
        discrepancy,
        corrective_action,
        symbol,
        wuc,
        shop,
        prd,
        is_complete,
        is_sched_insp }
    );
  };
};
