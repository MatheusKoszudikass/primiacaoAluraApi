// db.js
import pgPromise from 'pg-promise';

// Inicialize o pg-promise
const pgp = pgPromise();

// Configuração de conexão
const db = pgp('postgres://default:pLOQC2RN7lTY@ep-morning-block-a45cjvm7.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require');

// Exportar a instância db
export default db;
