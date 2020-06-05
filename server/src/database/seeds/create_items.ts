import Knex from "knex";

export async function seed(knex: Knex){
    await knex('items').insert([
        {title: 'Lâmpadas', image: 'lampadas.svg'},
        {title: 'Pilhas e Baterias', image: 'baterias.svg'},
        {title: 'Papéis Papelão', image: 'lampadas.svg'},
        {title: 'Resíduos Eletrônicos', image: 'eletronicos.svg'},
        {title: 'Resíduos Orgnânicos', image: 'organicos.svg'},
        {title: 'Óleo de Cozinho', image: 'oleo.svg'}
    ]);
};