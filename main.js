import sql from "mssql";
import { insertItemsPedido } from "./azure_inserters/items_pedido.js";
import { insertParcelas } from "./azure_inserters/parcelas.js";
import { insertPedido } from "./azure_inserters/pedidos.js";
import { config } from "./connect.js";
import { orders } from "./fetchOmie/orders.js";


const dalt = new Date().toISOString();

let pool;


const main = async () => {
  try {
    pool = await sql.connect(config);
    console.log("Connection to SQL Azure.");

    //await insertCPLancamento(pool);
    const pedidos = await orders();
    //await insertCCLancamento(pool);
    //await insertCategorias(pool, dalt);
    //await insertCtgTotalizadora(pool, dalt);

    //await insertProdutos(pool, produtos);
    //await insertFamCadastro(pool, dalt);
    //await insertVendedores(pool, dalt);
    //await insertMeiosPagamentos(pool, dalt);
    //await insertProjetos(pool);

    for (const pedido of pedidos) {
      await insertPedido(pool, pedido, dalt); // Pedidos
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
