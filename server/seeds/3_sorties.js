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

  for (let i = 0; i < 50; i++) {
    const ac = faker.helpers.arrayElement(aircraft);
    const tail_number = ac.tail_number;
    const parking_location = ac.location;
    const launch_location = ac.location;
    const animal = faker.animal[faker.animal.type()]().split(' ');
    const callsign = capitalize(faker.word.adjective()) + ' ' +
      capitalize(animal[animal.length - 1]);

    if (faker.datatype.boolean()) {
      // sortie has already finished
      var projected_land = faker.date.recent(7);
      var projected_launch = faker.date.recent(0.25, projected_land);
      var actual_land = faker.date.soon(0.25, projected_launch);
      var actual_launch = faker.date.recent(0.25, actual_land);
      var taxi = faker.date.recent(0.02, actual_launch);
      var eng_start = faker.date.recent(0.05, taxi);
      var crew_show = faker.date.recent(0.05, eng_start);
      var crew_ready = faker.date.recent(0.1, crew_show)
      var hours_flown = Math.round((actual_land - actual_launch) / 3600000);
      var landing_status = faker.datatype.number({min: 1, max: 3});
    } else {
      // sortie is scheduled for future
      var projected_launch = faker.date.soon(7);
      var projected_land = faker.date.soon(0.25, projected_launch);
      var crew_ready = null;
      var crew_show = null;
      var taxi = null;
      var eng_start = null;
      var actual_launch = null;
      var actual_land = null;
      var hours_flown = null;
      var landing_status = null;
    }
    const deviations = 'none';
    const hours_scheduled = Math.round((projected_land - projected_launch) / 3600000);
    const req_fuel = faker.datatype.number({ min: 130, max: 260 });
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
