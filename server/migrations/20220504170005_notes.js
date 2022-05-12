/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('notes', table => {
    table.increments('id');
    table.integer('jcn');
    table.foreign('jcn').references('imds.jcn');
    table.text('note');
    table.timestamps(true, true, false);
    table.boolean('is_active');
  });  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('notes', table => {
    table.dropForeign('jcn');
  }).then(() => knex.schema
    .dropTableIfExists('notes')
  );
};
