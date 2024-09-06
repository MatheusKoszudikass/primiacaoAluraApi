import express from 'express';
import db from './Data/DbContext.js';

const server = express();

// Tentar conexão com o banco de dados antes de iniciar o servidor
db.any('SELECT 1 + 1 AS result')
    .then(result => {
        console.log('Conexão ao banco de dados bem-sucedida:', result);

        // Iniciar o servidor somente após a conexão bem-sucedida
        server.listen(3000, () => {
            console.log('Servidor rodando na porta 3000');
        });
    })
    .catch(error => {
        console.error('Erro ao conectar ao banco de dados:', error);
        process.exit(1); // Finaliza o processo caso a conexão falhe
    });

// Rota de teste
server.get('/', (req, res) => {
    return res.json({ message: 'Teste ok' });
});
