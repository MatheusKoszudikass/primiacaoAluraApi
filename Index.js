import express from 'express';
import db from './Data/DbContext.js';

const app = express();
const port = 3000;

// Rotas
app.post('/usuarios', async (req, res) =>{
    const {nome, alegre, itermediario, triste} = req.body;

    if(nome === undefined || alegre === undefined || itermediario === undefined
        || triste === undefined)
        {
            return res.status(400).json({error: 'Todos os campos são necessários: nome, alegre, intermediario, triste'});
        }

        const query = `
        INSERT INTO usuarios (nome, alegre, intermediario, triste)
        VALUES (@1, @2, @3, @4)
        RETURNING *;
    `;

    try{
        const result = await db.one(query, [nome, alegre, intermediario, triste]);
        res.status(201).json({message: 'Usuário criado com sucesso!', user: result});
    }
    catch(error)
    {
        console.error('Erro ao criar o usuário:', error);
        res.status(500).json({error: 'Erro ao cria o usuário'});
    }
});

app.get('/', (req, res) => {
    return res.json({ message: 'Teste ok' });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});