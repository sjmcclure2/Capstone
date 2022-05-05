/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('aircraft', table => {
    table.increments('id');
    table.string('status');
    table.integer('fuel_quant');
    table.integer('operating_hrs');
    table.foreign('location').references('locations.id');
  });  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('aircraft', table => {
    table.dropForeign('location');
  }).then(() => knex.schema
    .dropTableIfExists('aircraft')
  );
};
