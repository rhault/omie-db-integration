import axios from 'axios';

export const fetchOrders = async () => {
  const url = 'https://app.omie.com.br/api/v1/produtos/pedido/';
  const data = {
    call: 'ListarPedidos',
    app_key: '',
    app_secret: '',
    param: [
      {
        pagina: 1,
        registros_por_pagina: 500,
        apenas_importado_api: 'N',
        filtrar_por_data_de: '18/11/2024',
        filtrar_por_data_ate: '18/11/2024',
      },
    ],
  };

  try {
    const response = await axios.post(url, data, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data.pedido_venda_produto || [];
  } catch (error) {
    console.error('Erro ao buscar dados da API:', error);
    throw error;
  }
};
