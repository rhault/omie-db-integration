import { fetchOmie } from "./omie.js";

export const orders = async () => {
  const url = "https://app.omie.com.br/api/v1/produtos/pedido/";
  const call = "ListarPedidos";
  const param = [
    {
      pagina: 1,
      registros_por_pagina: 500,
      apenas_importado_api: "N",
      status_pedido: "AUTORIZADO", // DEVOLVIDO, AUTORIZADO, FATURADO, CANCELADO, DENEGADO
      filtrar_por_data_de: "13/06/2025",
      //filtrar_por_data_ate: "16/05/2025",
      //data_cancelamento_de: "24/11/2024",
      //filtrar_por_data_ate: "19/11/2024",
      filtrar_por_hora_de: "12:00:00",
      //filtrar_apenas_alteracao: "N",
      //numero_pedido_de: 9601,
      //numero_pedido_ate: 9700,
    },
  ];

  try {
    //Connection with Omie
    const orders = await fetchOmie(url, call, param);
    const { pedido_venda_produto, total_de_registros } = orders || [];
    console.log("Total orders entered/updated: ", total_de_registros);
    return pedido_venda_produto;
  } catch (error) {
    console.log("Error when requesting orders on Omie");
    throw error;
  }
};
