import pkd from "pg";
import fs from "fs";
import { parse } from "json2csv";
import { BigQuery } from "@google-cloud/bigquery";
const { Client } = pkd;

// Configurar a conexão com o PostgreSQL
const pgClient = new Client({
  host: "localhost", // Endereço do servidor PostgreSQL
  port: 5432, // Porta do PostgreSQL
  user: "postgres", // Seu usuário do PostgreSQL
  password: "bf1020", // Sua senha do PostgreSQL
  database: "postgres", // O nome do seu banco de dados
});

// Definir as credenciais do BigQuery
const bigquery = new BigQuery();

// Função para conectar ao PostgreSQL
async function conectarAoPostgres() {
  try {
    await pgClient.connect();
    console.log("Conectado ao PostgreSQL com sucesso!");
  } catch (error) {
    console.error("Erro ao conectar ao PostgreSQL:", error);
    process.exit(1);
  }
}

// Função para extrair dados de várias tabelas
async function extrairDados(tabelas) {
  const dados = {};

  for (let tabela of tabelas) {
    const query = `SELECT * FROM ${tabela}  WHERE dalt = '09/12/2024'`;
    try {
      const res = await pgClient.query(query);
      dados[tabela] = res.rows; // Armazenar os dados de cada tabela
    } catch (error) {
      console.error(`Erro ao extrair dados da tabela ${tabela}:`, error);
      process.exit(1);
    }
  }

  return dados;
}

// Função para criar CSV para cada tabela
function criarCSV(dados) {
  for (let tabela in dados) {
    try {
      const csv = parse(dados[tabela]);
      fs.writeFileSync(`${tabela}_dados.csv`, csv); // Salva o CSV com o nome da tabela
      console.log(`Arquivo CSV para a tabela ${tabela} criado com sucesso!`);
    } catch (error) {
      console.error(`Erro ao criar CSV para a tabela ${tabela}:`, error);
      process.exit(1);
    }
  }
}

function verificarArquivo(filePath) {
  const fileExists = fs.existsSync(filePath);
  if (!fileExists) {
    console.error(`O arquivo ${filePath} não foi encontrado.`);
    process.exit(1);
  }
  const y = fs.createReadStream(filePath);
  return filePath;
}

// Função principal para rodar todas as etapas
async function main() {
  await conectarAoPostgres();
  const tabelas = ["item_pedido"];
  const dados = await extrairDados(tabelas);
  criarCSV(dados);

  // Fechar a conexão com o PostgreSQL após concluir
  pgClient.end();
}

main().catch(console.error);
