import sql from "mssql";
import { config } from "./connect.js";
import { orders } from "./fetchOmie/orders.js";
import { insertPedido } from "./azure_inserters/pedidos.js";
import { insertItemsPedido } from "./azure_inserters/items_pedido.js";
import { insertParcelas } from "./azure_inserters/parcelas.js";
import { insertProdutos } from "./azure_inserters/produtos.js";
import { insertMeiosPagamentos } from "./azure_inserters/meios_pagamento.js";
import { insertFamCadastro } from "./azure_inserters/fam_cadastro.js";
import { insertVendedores } from "./azure_inserters/vendedores.js";
import { insertProjetos } from "./azure_inserters/projeto.js";

const dalt = new Date().toLocaleDateString("pt-BR");
let pool;

const main = async () => {
  try {
    pool = await sql.connect(config);
    console.log("Connection to SQL Azure.");

    const pedidos = await orders();

    //await insertProdutos(pool, produtos);
    //await insertFamCadastro(pool, dalt);
    //await insertVendedores(pool, dalt);
    //await insertMeiosPagamentos(pool, dalt);
    //await insertProjetos(pool);

    for (const pedido of pedidos) {
      await insertPedido(pool, pedido); // Pedidos
      await insertItemsPedido(pool, pedido, dalt); //Itens Pedidos
      await insertParcelas(pool, pedido, dalt);
    }
  } catch (err) {
    console.error("Process error (main)", err.message);
    process.exit(1);
  } finally {
    if (pool) await pool.close();
    console.log("Database connection closed");
  }
};

main();
