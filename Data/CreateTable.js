import db from './DbContext.js'

async function createTable() {
    const query = `
        CREATE TABLE usuarios (
            id SERIAL PRIMARY KEY,
            nome VARCHAR(20) NOT NULL,
            alegre INT NOT NULL,
            intermediario INT NOT NULL,
            triste INT NOT NULL
        );
    `;
    try {
        await db.none(query);  // Executa a query sem esperar retorno
        console.log('Tabela "usuarios" criada com sucesso!');
    } catch (error) {
        console.error('Erro ao criar a tabela:', error);
    }
}

createTable();