/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('sorties', table => {
    table.increments('id');
    table.foreign('parking_location').references('locations.id');
    table.foreign('launch_location').references('locations.id');
    table.foreign('tail_number').references('aircraft.id');
    table.string('callsign');
    table.integer('hours_scheduled');
    table.integer('hours_flown');
    table.datetime('projected_launch');
    table.datetime('actual_launch');
    table.datetime('projected_land');
    table.datetime('actual_land');
    table.string('landing_status');
    table.string('deviations');
    table.datetime('crew_ready');
    table.datetime('crew_show');
    table.datetime('eng_start');
    table.datetime('taxi');
    table.integer('req_fuel');
  });  
}; 

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('sorties', table => {
    table.dropForeign('parking_location');
    table.dropForeign('launch_location');
    table.dropForeign('tail_number');
  }).then(() => knex.schema
    .dropTableIfExists('sorties')
  );
};
