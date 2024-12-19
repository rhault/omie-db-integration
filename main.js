import sql from "mssql";
import { config } from "./connect.js";
import { orders } from "./fetchOmie/orders.js";
import { products } from "./fetchOmie/products.js";
import { insertPedido } from "./azure_inserters/pedidos.js";
import { insertItemsPedido } from "./azure_inserters/items_pedido.js";
import { insertParcelas } from "./azure_inserters/parcelas.js";
import { insertProdutos } from "./azure_inserters/produtos.js";

const dalt = new Date().toLocaleDateString("pt-BR");
let pool;

const main = async () => {
  try {
    pool = await sql.connect(config);
    console.log("Connection to SQL Azure.");
    const pedidos = await orders();
    //const produtos = await products();
    //await insertProdutos(pool, produtos);

    for (const pedido of pedidos) {
      await insertPedido(pool, pedido); // Pedidos
      await insertItemsPedido(pool, pedido, dalt); //Itens Pedidos
      await insertParcelas(pool, pedido, dalt);
    }
  } catch (err) {
    console.error("Process error", err.message);
    process.exit(1);
  } finally {
    if (pool) await pool.close();
    console.log("Database connection closed");
  }
};

main();
