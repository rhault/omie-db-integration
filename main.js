import client from "./db.js";
import { orders } from "./fetchOmie/orders.js";
import { products } from "./fetchOmie/products.js";
import { insertPedido } from "./inserters/pedidos.js";
import { insertItemsPedido } from "./inserters/item_pedido.js";
import { insertParcelas } from "./inserters/parcelas.js";
import { insertProdutos } from "./inserters/produtos.js";

const dalt = new Date().toLocaleDateString("pt-BR");

const main = async () => {
  try {
    await client.connect();
    console.log("Conectado ao banco de dados");

    const pedidos = await orders();
    //const produtos = await products();
    //await insertProdutos(client, produtos, dalt);

    for (const pedido of pedidos) {
      await insertPedido(client, pedido); // Pedidos
      await insertItemsPedido(client, pedido, dalt); //Itens Pedidos
      await insertParcelas(client, pedido, dalt); //Parcelas
    }
  } catch (error) {
    console.error("Erro no processo:", error);
  } finally {
    await client.end();
    console.log("Conexão com o banco de dados encerrada");
  }
};

main();
