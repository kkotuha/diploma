import mysql from 'mysql2/promise';

if (!process.env.DB_HOST) {
  throw new Error('DB_HOST not found');
}

if (!process.env.DB_USER) {
  throw new Error('DB_USER not found');
}

if (!process.env.DB_PASSWORD) {
  throw new Error('DB_PASSWORD not found');
}

if (!process.env.DB_NAME) {
  throw new Error('DB_NAME not found');
}

const opt = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};

const pool = mysql.createPool(opt);

export const db = pool;