import { BigQuery } from "@google-cloud/bigquery";
import { itemPedidosSchema } from "./bigquery/schema/table_temporary.js";
import { createTable } from "./bigquery/createTable.js";
import csv from "csv-parser";
import dotenv from "dotenv";
import fs from "fs";
import { CLIENT_RENEG_WINDOW } from "tls";

dotenv.config();

// Configurações
const projectId = process.env.PROJECT_ID;
const datasetId = process.env.DATASET_ID;
const tableId = "itemTest"; // Nome da tabela no BigQuery
const csvFilePath = "./csv/item_pedido_dados.csv"; // rota do arquivo CSV

// Função para carregar o CSV
async function carregarCsv(caminhoCsv) {
  return new Promise((resolve, reject) => {
    const rows = [];
    fs.createReadStream(caminhoCsv)
      .pipe(csv())
      .on("data", (row) => {
        row.codigo_item = parseInt(row.codigo_item, 10);
        row.numero_pedido = parseInt(row.numero_pedido, 10);
        row.codigo_produto = parseInt(row.codigo_produto, 10);
        row.cfop = parseFloat(row.cfop);
        row.percentual_desconto = parseFloat(row.percentual_desconto);
        row.quantidade = parseInt(row.quantidade);
        row.reservado = row.reservado == "N" ? false : true;
        row.valor_deducao = parseInt(row.valor_deducao);
        row.valor_desconto = parseFloat(row.valor_desconto);
        row.valor_mercadoria = parseFloat(row.valor_mercadoria);
        row.valor_total = parseFloat(row.valor_total);
        row.valor_unitario = parseFloat(row.valor_unitario);
        rows.push(row);
      })
      .on("end", () => resolve(rows))
      .on("error", (error) => reject(error));
  });
}

const run = async () => {
  const y = await carregarCsv(csvFilePath);
  console.log(y[1]);
};

//run();
/* y.then((data) => {
  console.log(data);
}); */

// Função para atualizar ou inserir dados no BigQuery
async function atualizarOuInserirBigQuery(rows) {
  const bigquery = new BigQuery({
    keyFilename: process.env.GOOGLE_CREDENTIALS,
    projectId,
  });

  //const tempTableId = `TEMPORARY_${tableId}`; // Nome da tabela temporária
  const tempTableId = "itemTestTemp";
  const targetTable = `${projectId}.${datasetId}.${tableId}`; // Nome completo da tabela alvo

  //createTable("itemTestTemp", itemPedidosSchema, bigquery, datasetId);

  console.log("Inserido dados na tabela temporária...");
  await bigquery.dataset(datasetId).table(tempTableId).insert(rows);

  // Comando SQL para fazer o MERGE
  const mergeSql = `
    MERGE \`${targetTable}\` AS target
    USING \`${datasetId}.${tempTableId}\` AS source
    ON target.codigo_item = source.codigo_item
    WHEN MATCHED THEN
      UPDATE SET
        codigo_item = source.codigo_item,
        numero_pedido = source.numero_pedido,
        codigo_produto = source.codigo_produto,
        cfop = source.cfop,
        ncm = source.ncm,
        percentual_desconto = source.percentual_desconto,
        quantidade = source.quantidade,
        reservado = source.reservado,
        valor_deducao = source.valor_deducao,
        valor_desconto = source.valor_desconto,
        valor_mercadoria = source.valor_mercadoria,
        valor_total = source.valor_total,
        valor_unitario = source.valor_unitario,
        dalt = source.dalt
    WHEN NOT MATCHED THEN
      INSERT (
        codigo_item,
        numero_pedido,
        codigo_produto,
        cfop,
        ncm,
        percentual_desconto,
        quantidade,
        reservado,
        valor_deducao,
        valor_desconto,
        valor_mercadoria,
        valor_total,
        valor_unitario,
        dalt
      ) 
      VALUES (
        source.codigo_item,
        source.numero_pedido,
        source.codigo_produto,
        source.cfop,
        source.ncm,
        source.percentual_desconto,
        source.quantidade,
        source.reservado,
        source.valor_deducao,
        source.valor_desconto,
        source.valor_mercadoria,
        source.valor_total,
        source.valor_unitario,
        source.dalt
      );
  `;

  console.log("Executando MERGE no BigQuery...");
  await bigquery.query(mergeSql);

  // Removendo a tabela temporária
  console.log("Removendo tabela temporária...");
  await bigquery.dataset(datasetId).table(tempTableId).delete();

  //console.log("Dados atualizados ou inseridos com sucesso!");
}

// Fluxo principal
(async () => {
  try {
    //console.log("Carregando dados do CSV...");
    //const rows = await carregarCsv(csvFilePath);

    const rows = [
      {
        codigo_item: 101,
        numero_pedido: 20230415,
        codigo_produto: 50123,
        cfop: 5.102,
        ncm: "87082999",
        percentual_desconto: 10.5,
        quantidade: 40,
        reservado: true,
        valor_deducao: 500,
        valor_desconto: 150.75,
        valor_mercadoria: 1350.0,
        valor_total: 1200.0,
        valor_unitario: 67.5,
        dalt: "2024-12-10",
      },
    ];

    //console.log("Atualizando ou inserindo dados no BigQuery...");
    await atualizarOuInserirBigQuery(rows);
  } catch (error) {
    console.error("Erro ao executar o script:", error);
  }
})();
