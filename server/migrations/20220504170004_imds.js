/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('imds', table => {
    table.increments('jcn');
    table.string('tail_number');
    table.foreign('tail_number').references('aircraft.tail_number');
    table.datetime('mx_etic_start');
    table.datetime('mx_etic');
    table.integer('etic_update');
    table.string('discrepancy');
    table.string('corrective_action');
    table.string('symbol');
    table.string('wuc');
    table.string('shop');
    table.boolean('prd');
    table.boolean('is_complete');
    table.boolean('is_sched_insp');
  });  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('imds', table => {
    table.dropForeign('tail_number');
  }).then(() => knex.schema
    .dropTableIfExists('imds')
  );
};
