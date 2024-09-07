import express from 'express';
import db from './Data/DbContext.js';

const app = express();
const port = process.env.PORT || 3000; 

app.use(express.json()); // Middleware para parsing JSON


// Rotas
app.post('/usuarios', async (req, res) => {
    const { nome, alegre, intermediario, triste, descricao } = req.body;

    if (nome === undefined || alegre === undefined || intermediario === undefined || triste === undefined || descricao === andefined) {
        return res.status(400).json({ error: 'Todos os campos são necessários: nome, alegre, intermediario, triste' });
    }

    const query = `
        INSERT INTO usuarios (nome, alegre, intermediario, triste, descricao)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `;

    try {
        const result = await db.one(query, [nome, alegre, intermediario, triste]);
        res.status(201).json({ message: 'Usuário criado com sucesso!', user: result });
    } catch (error) {
        console.error('Erro ao criar o usuário:', error);
        res.status(500).json({ error: 'Erro ao criar o usuário.' });
    }
});

app.get('/', async (req, res) => {
    const query = 'SELECT * FROM usuarios';

    try {
        const result = await db.any(query);
        res.status(200).json(result);
    } catch (error) {
        console.error('Erro ao buscar os usuários:', error);
        res.status(500).json({ error: 'Erro ao buscar os usuários.' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});