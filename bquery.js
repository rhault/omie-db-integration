import { BigQuery } from "@google-cloud/bigquery";
import { itemPedidosSchema } from "./schema/table_temporary.js";
import csv from "csv-parser";
import dotenv from "dotenv";
import fs from "fs";
import { CLIENT_RENEG_WINDOW } from "tls";

dotenv.config();

// Configurações
const projectId = process.env.PROJECT_ID;
const datasetId = process.env.DATASET_ID;
const tableId = "item_pedido"; // Nome da tabela no BigQuery
const csvFilePath = "./csv/item_pedido_dados.csv"; // rota do arquivo CSV

// Função para carregar o CSV
async function carregarCsv(caminhoCsv) {
  const rows = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(caminhoCsv)
      .pipe(csv())
      .on("data", (row) => rows.push(row))
      .on("end", () => resolve(rows))
      .on("error", (error) => reject(error));
  });
}

const y = carregarCsv(csvFilePath);
console.log(y);
/* y.then((data) => {
  console.log(data);
}); */

// Função para atualizar ou inserir dados no BigQuery
async function atualizarOuInserirBigQuery(rows) {
  const bigquery = new BigQuery({
    keyFilename: process.env.GOOGLE_CREDENTIALS,
    projectId,
  });

  const tempTableId = `TEMPORARY_${tableId}`; // Nome da tabela temporária
  const targetTable = `${projectId}.${datasetId}.${tableId}`; // Nome completo da tabela alvo

  const options = {
    schema: itemPedidosSchema,
    location: "US",
  };

  // Criação da tabela temporária
  console.log("Criando tabela temporária...");
  const [table] = await bigquery
    .dataset(datasetId)
    .createTable(tempTableId, options);

  console.log("Inserido dados na tabela temporária...");
  await bigquery.dataset(datasetId).table(tempTableId).insert(rows);

  // Comando SQL para fazer o MERGE
  const mergeSql = `
    MERGE \`${targetTable}\` AS target
    USING \`${datasetId}.${tempTableId}\` AS source
    ON target.codigo_item = source.codigo_item
    WHEN MATCHED THEN
      UPDATE SET
        codigo_item = source.codigo_item
        numero_pedido = source.numero_pedido
        codigo_produto = source.codigo_produto
        cfop = source.cfop
        ncm = source.ncm
        percentual_desconto = source.percentual_desconto
        quantidade = source.quantidade
        reservado = source.reservado
        valor_deducao = source.valor_deducao
        valor_desconto = source.valor_desconto
        valor_mercadoria = source.valor_mercadoria
        valor_total = source.valor_total
        valor_unitario = source.valor_unitario
        dAlt = source.dAlt
    WHEN NOT MATCHED THEN
      INSERT (
        codigo_item
        numero_pedido
        codigo_produto
        cfop
        ncm
        percentual_desconto
        quantidade
        reservado
        valor_deducao
        valor_desconto
        valor_mercadoria
        valor_total
        valor_unitario
        dAlt
      ) 
      VALUES (
        source.codigo_item
        source.numero_pedido
        source.codigo_produto
        source.cfop
        source.ncm
        source.percentual_desconto
        source.quantidade
        source.reservado
        source.valor_deducao
        source.valor_desconto
        source.valor_mercadoria
        source.valor_total
        source.valor_unitario
        source.dAlt
      );
  `;

  /* console.log("Executando MERGE no BigQuery...");
  await bigquery.query(mergeSql); */

  // Removendo a tabela temporária
  /* console.log("Removendo tabela temporária...");
  await bigquery.dataset(datasetId).table(tempTableId).delete(); */

  console.log("Dados atualizados ou inseridos com sucesso!");
}

// Fluxo principal
async () => {
  try {
    console.log("Carregando dados do CSV...");
    const rows = await carregarCsv(csvFilePath);

    console.log("Atualizando ou inserindo dados no BigQuery...");
    await atualizarOuInserirBigQuery(rows);
  } catch (error) {
    console.error("Erro ao executar o script:", error);
  }
};
