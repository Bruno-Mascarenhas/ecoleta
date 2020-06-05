import Knex from 'knex';

export async function up(knex: Knex){
    //table initialization
    return knex.schema.createTable('items', table =>{
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('title').notNullable();
    });
};

export async function down(knex: Knex){
    //table rollback
    return knex.schema.dropTable('items');
};