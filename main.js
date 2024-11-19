import client from './db.js';
import { fetchOrders } from './omie.js';
import { insertPedido } from './inserters/pedidos.js';
import { insertItemsPedido } from './inserters/item_pedido.js';

const dalt = new Date().toLocaleDateString('pt-BR');

const main = async () => {
  try {
    //await client.connect();
    console.log('Conectado ao banco de dados');

    const pedidos = await fetchOrders();

    for (const pedido of pedidos) {
      //await insertPedido(client, pedido); // Pedidos
      await insertItemsPedido(client,pedido, dalt); //Itens Pedidos
    }
  } catch (error) {
    console.error('Erro no processo:', error);
  } finally {
    //await client.end();
    console.log('Conexão com o banco de dados encerrada');
  }
};

main();
