// db.js
import pgPromise from 'pg-promise';

// Inicialize o pg-promise
const pgp = pgPromise();

// Configuração de conexão
const db = pgp("postgres://default:g9QKmrpoy6eW@ep-curly-river-a427owrn.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require");

// Exportar a instância db
export default db;
