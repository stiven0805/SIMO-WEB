import pkg from 'pg';
const { Pool } = pkg;
import * as dotenv from 'dotenv';
dotenv.config();

export const pool = new Pool({
  host:     process.env.DB_HOST || 'localhost',
  port:     process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'reciclaje_app',
  user:     process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
});

pool.connect()
  .then(() => console.log(`✅ Conectado a PostgreSQL — ${process.env.DB_NAME || 'reciclaje_app'}`))
  .catch(err => console.error('❌ Error conectando a PostgreSQL:', err.message));
