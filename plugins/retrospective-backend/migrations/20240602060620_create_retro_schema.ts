import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('boards', (table) => {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.string('description').nullable();
    table.timestamps(true, true);
  });

  await knex.schema.createTable('retros', (table) => {
    table.increments('id').primary();
    table.integer('board_id').unsigned().references('id').inTable('boards').onDelete('CASCADE');
    table.boolean('is_active').defaultTo(true);
    table.timestamps(true, true);
  });

  await knex.schema.createTable('columns', (table) => {
    table.increments('id').primary();
    table.integer('retro_id').unsigned().references('id').inTable('retros').onDelete('CASCADE');
    table.string('title').notNullable();
    table.string('color').notNullable();
    table.string('icon').notNullable();
    table.boolean('is_actions').defaultTo(false);
    table.timestamps(true, true);
  });

  await knex.schema.createTable('cards', (table) => {
    table.increments('id').primary();
    table.integer('column_id').unsigned().references('id').inTable('columns').onDelete('CASCADE');
    table.string('title').notNullable();
    table.integer('upvotes').defaultTo(0);
    table.boolean('done').defaultTo(false);
    table.timestamps(true, true);
  });

  await knex.schema.createTable('archived_retros', (table) => {
    table.increments('id').primary();
    table.integer('board_id').unsigned().references('id').inTable('boards').onDelete('CASCADE');
    table.timestamps(true, true);
  });

  await knex.schema.createTable('archived_columns', (table) => {
    table.increments('id').primary();
    table.integer('retro_id').unsigned().references('id').inTable('archived_retros').onDelete('CASCADE');
    table.string('title').notNullable();
    table.string('color').notNullable();
    table.string('icon').notNullable();
    table.boolean('is_actions').defaultTo(false);
    table.timestamps(true, true);
  });

  await knex.schema.createTable('archived_cards', (table) => {
    table.increments('id').primary();
    table.integer('column_id').unsigned().references('id').inTable('archived_columns').onDelete('CASCADE');
    table.string('title').notNullable();
    table.integer('upvotes').defaultTo(0);
    table.boolean('done').defaultTo(false);
    table.timestamps(true, true);
  });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('archived_cards');
  await knex.schema.dropTableIfExists('archived_columns');
  await knex.schema.dropTableIfExists('archived_retros');
  await knex.schema.dropTableIfExists('cards');
  await knex.schema.dropTableIfExists('columns');
  await knex.schema.dropTableIfExists('retros');
  await knex.schema.dropTableIfExists('boards');
}

