/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.alterTable('aircraft', table => {
    table.integer('driver');
    // table.foreign('driver').references('imds.jcn');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('aircraft', table => {
    // table.dropForeign('driver');
    table.dropColumn('driver');
  });
};
