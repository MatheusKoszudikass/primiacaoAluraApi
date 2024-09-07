import pgPromise from 'pg-promise';
import dotenv from 'dotenv';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

const pgp = pgPromise();

// Usa a variável de ambiente para configurar a conexão
const db = pgp(process.env.POSTGRES_URL);

export default db;
