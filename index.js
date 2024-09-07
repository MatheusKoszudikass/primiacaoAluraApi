import express from 'express';
import db from './Data/DbContext.js';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

const app = express();
const port = process.env.PORT || 3000;


app.use(cors());

// Middleware para parsing de JSON
app.use(express.json());

// Configuração do limite de taxa
const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutos
    max: 5, // Limita a 5 requisições por IP por janela de tempo
    message: 'Muitos pedidos, tente novamente daqui a 5 minutos',
});

const limiterGet = rateLimit({
    windowMs: 1 * 60 * 1000, 
    max: 5, 
    message: 'Muita requisição, tente novamente daqui a 1 minutos',
})

// Aplica o limite de taxa apenas para a rota de adição de usuários
app.use('/voto', limiter);

app.use('/', limiterGet);

// Rotas
app.post('/voto', async (req, res) => {
    const { bom, intermediario, ruim } = req.body;

    const query = `
        INSERT INTO voto (bom, intermediario, ruim)
        VALUES ($1, $2, $3)
        RETURNING *;
    `;

    try {
        const result = await db.one(query, [ bom || null, intermediario || null, ruim || null ]);
        res.status(201).json({ message: 'Usuário criado com sucesso!', user: result });
    } catch (error) {
        console.error('Erro ao criar o usuário:', error);
        res.status(500).json({ error: 'Erro ao criar o usuário.' });
    }
});

app.get('/', async (req, res) => {
    const query = 'SELECT * FROM voto';

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


  