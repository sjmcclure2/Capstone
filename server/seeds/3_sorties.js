const { faker } = require('@faker-js/faker');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('sorties').del();

  const aircraft = await knex('aircraft').select('tail_number', 'location');
  const capitalize = str => str[0].toUpperCase() + str.slice(1);

  for (let i = 0; i < 20; i++) {
    const ac = faker.helpers.arrayElement(aircraft);
    const tail_number = ac.tail_number;
    const parking_location = ac.location;
    const launch_location = ac.location;
    const animal = faker.animal[faker.animal.type()]().split(' ');
    const callsign = capitalize(faker.word.adjective()) + ' ' +
      capitalize(animal[animal.length - 1]);
    const projected_launch = faker.date.recent(0) ;
    const crew_ready = faker.date.recent(0.3, projected_launch);
    const crew_show = faker.date.soon(0.1, crew_ready) ;
    const eng_start = faker.date.soon(0.1, crew_show) ;
    const taxi = faker.date.soon(0.1, eng_start);
    const actual_launch = faker.date.soon(0.1, taxi);
    const projected_land = faker.date.soon(1, projected_launch);
    const actual_land = faker.date.soon(1, projected_launch);
    const landing_status = faker.datatype.number({min: 1, max: 3});
    const deviations = 'none';
    const hours_flown = Math.round((actual_land - actual_launch) / 3600000);
    const hours_scheduled = Math.round((projected_land - projected_launch) / 3600000);
    const req_fuel = faker.datatype.number({ min: 220, max: 312 });
    const is_quickturn =  faker.datatype.boolean();

    await knex('sorties').insert(
      { tail_number,
        callsign,
        parking_location,
        launch_location,
        hours_scheduled,
        hours_flown,
        projected_launch,
        actual_launch,
        projected_land,
        actual_land,
        landing_status,
        deviations,
        crew_ready,
        crew_show,
        eng_start,
        taxi,
        req_fuel,
        is_quickturn }
    );
  };
};
