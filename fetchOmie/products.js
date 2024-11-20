import { fetchOmie } from "./omie.js";

export const products = async () => {
  const url = "https://app.omie.com.br/api/v1/geral/produtos/";
  const call = "ListarProdutos";
  const param = [
    {
      pagina: 1,
      registros_por_pagina: 300,
      apenas_importado_api: "N",
      filtrar_apenas_omiepdv: "N",
      filtrar_por_data_de: "19/11/2024",
    },
  ];

  try {
    const data = await fetchOmie(url, call, param);
    const { produto_servico_cadastro, total_de_paginas } = data;
    console.log("Paginas: ", total_de_paginas);
    return produto_servico_cadastro;
  } catch (error) {
    console.log("Erro ao solicitar os produtos");
    throw error;
  }
};
