const { faker } = require('@faker-js/faker');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex.schema.raw('TRUNCATE aircraft CASCADE');
  await knex('aircraft').del();

  const locations = await knex('locations').select('id');

  for (let i = 0; i < 50; i++) {
    const yr = faker.datatype.number(99).toString().padStart(2, '0');
    const ser = faker.datatype.number(9999).toString().padStart(4, '0');
    const tail_number = `${yr}-${ser}`;

    const status = faker.helpers.arrayElement([ "FMC", "PMCM", "NMCM", "PMCB",
      "PMCS", "NMCA", "NMCB", "NMCBA", "NMCBS", "MNCBU", "NMCBSA", "NMCBUA",
      "NMCMA", "NMCMS", "NMCMU", "NMCMSA", "NMCMUA", "NMCS", "NMCSA" ]
    );

    const fuel_quant = faker.datatype.number(300);
    const operating_hrs = faker.datatype.number({ min: 1000, max: 9999 });
    const location = faker.unique(faker.helpers.arrayElement, [ locations.map(el => el.id) ]);

    await knex('aircraft').insert(
      { tail_number,
        status,
        fuel_quant,
        operating_hrs,
        location }
    );
  };
};
