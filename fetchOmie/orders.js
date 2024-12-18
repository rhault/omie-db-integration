import { fetchOmie } from "./omie.js";

export const orders = async () => {
  const url = "https://app.omie.com.br/api/v1/produtos/pedido/";
  const call = "ListarPedidos";
  const param = [
    {
      pagina: 1,
      registros_por_pagina: 500,
      apenas_importado_api: "N",
      filtrar_por_data_de: "18/12/2024",
      //data_cancelamento_de: "24/11/2024",
      //filtrar_por_data_ate: "19/11/2024",
      //filtrar_por_hora_de: "13:00:00",
      //filtrar_apenas_alteracao: "N",
      //numero_pedido_de: 8597,
      //numero_pedido_ate: 8597,
    },
  ];

  try {
    const orders = await fetchOmie(url, call, param);
    const { pedido_venda_produto, total_de_registros } = orders || [];
    console.log("Total pedidos: ", total_de_registros);
    return pedido_venda_produto;
  } catch (error) {
    console.log("Erro ao solicitar os pedidos");
    throw error;
  }
};
