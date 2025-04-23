exports.up = async function (knex) {
  // 1. Origins table
  await knex.schema.createTable('origins', (table) => {
    table.increments('id').primary();
    table.string('name', 50).notNullable().unique();
  });

  await knex('origins').insert([{ name: 'Semente' }, { name: 'Muda' }, { name: 'Estaquia' }]);

  // 2. Crops table
  await knex.schema.createTable('crops', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.increments('number').notNullable();
    table.string('bed_column', 50).notNullable();
    table.string('plant_name', 100).notNullable();

    table.integer('origin_id').references('id').inTable('origins').onDelete('RESTRICT');

    table.uuid('source_crop_id').references('id').inTable('crops').onDelete('SET NULL');

    table.integer('production_cycle_grams').checkPositive();
    table.text('notes');

    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    table.index(['origin_id'], 'idx_crops_origin_id');
    table.index(['bed_column'], 'idx_crops_bed_column');
    table.index(['source_crop_id'], 'idx_crops_source_crop_id');
  });

  // 3. Crop Events table
  await knex.schema.createTable('crop_events', (table) => {
    table.increments('id').primary();
    table.uuid('crop_id').notNullable().references('id').inTable('crops').onDelete('CASCADE');

    table
      .enu('event_type', ['Plantio', 'Transplante', 'Solo Fixo', 'Primeira Flor', 'Primeira Colheita', 'Retirada'])
      .notNullable();

    table.date('event_date').notNullable();

    table.index(['crop_id'], 'idx_crop_events_crop_id');
    table.index(['event_date'], 'idx_crop_events_event_date');
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('crop_events');
  await knex.schema.dropTableIfExists('crops');
  await knex.schema.dropTableIfExists('origins');
};
