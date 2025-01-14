import { fetchOmie } from "./omie.js";

export const mvFinanceiro = async (page, type) => {
  const url = "https://app.omie.com.br/api/v1/financas/mf/";
  const call = "ListarMovimentos";
  const param = [
    {
      nPagina: page,
      nRegPorPagina: 50,
      dDtPagtoDe: "01/01/2022",
      dDtPagtoAte: "31/01/2022",
      cTpLancamento: type,
    },
  ];

  try {
    const data = await fetchOmie(url, call, param);
    return data;
  } catch (error) {
    console.log("Erro ao solicitar os registros");
    throw error;
  }
};
