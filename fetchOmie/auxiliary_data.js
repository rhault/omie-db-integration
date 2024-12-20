import { fetchOmie } from "./omie.js";

export const meiosPagamento = async () => {
  const url = "https://app.omie.com.br/api/v1/geral/meiospagamento/";
  const call = "ListarMeiosPagamento";
  const param = [
    {
      codigo: "",
    },
  ];

  try {
    const data = await fetchOmie(url, call, param);
    return data;
  } catch (error) {
    console.log("Error requesting payment methods");
    throw error;
  }
};

export const famCadastros = async () => {
  const url = "https://app.omie.com.br/api/v1/geral/familias/";
  const call = "PesquisarFamilias";
  const param = [
    {
      pagina: 1,
      registros_por_pagina: 50,
    },
  ];

  try {
    const data = await fetchOmie(url, call, param);
    console.log(`Number of pages: ${data.pagina}`);
    return data;
  } catch (error) {
    console.log("Error requesting product family");
    throw error;
  }
};

export const vendedores = async () => {
  const url = "https://app.omie.com.br/api/v1/geral/vendedores/";
  const call = "ListarVendedores";
  const param = [
    {
      pagina: 1,
      registros_por_pagina: 100,
      apenas_importado_api: "N",
    },
  ];

  try {
    const data = await fetchOmie(url, call, param);
    console.log(`Number of pages: ${data.pagina}`);
    return data;
  } catch (error) {
    console.log("Error requesting sellers");
    throw error;
  }
};

export const projeto = async () => {
  const url = "https://app.omie.com.br/api/v1/geral/projetos/";
  const call = "ListarProjetos";
  const param = [
    {
      pagina: 1,
      registros_por_pagina: 50,
      apenas_importado_api: "N",
    },
  ];

  try {
    const data = await fetchOmie(url, call, param);
    console.log(`Number of pages: ${data.pagina}`);
    return data;
  } catch (error) {
    console.log("Error requesting project");
    throw error;
  }
};
