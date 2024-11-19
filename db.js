import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
  host: '', 
  port: 5432, 
  user: 'postgres',
  password: '',
  database: 'postgres',
  connectionTimeoutMillis: 5000, 
});

export default client;
