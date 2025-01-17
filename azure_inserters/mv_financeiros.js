import { requestSQL } from "./request_sql.js";
import { mvFinanceiro } from "../fetchOmie/financialMovements.js";

export const insertCPLancamento = async (pool) => {
  const { nTotPaginas } = await mvFinanceiro(1, "CP");
  console.log("Paginas total mv", nTotPaginas);

  for (let page = 4; page <= nTotPaginas; page++) {
    const { nPagina, movimentos } = await mvFinanceiro(page, "CP");
    console.log("Pagina N°", nPagina);
    for (let index = 0; index < movimentos.length; index++) {
      const { detalhes, resumo } = movimentos[index];

      const query = `
        MERGE INTO cpMovimentos AS target
        USING (SELECT
          @cCPFCNPJCliente AS cCPFCNPJCliente,
          @cCodCateg AS cCodCateg,
          @cGrupo AS cGrupo,
          @cNatureza AS cNatureza,
          @cNumParcela AS cNumParcela,
          @cOrigem AS cOrigem,
          @cStatus AS cStatus,
          @cTipo AS cTipo,
          @dDtEmissao AS dDtEmissao,
          @dDtPagamento AS dDtPagamento,
          @dDtPrevisao AS dDtPrevisao,
          @dDtRegistro AS dDtRegistro,
          @dDtVenc AS dDtVenc,
          @nCodCC AS nCodCC,
          @nCodCliente AS nCodCliente,
          @nCodTitRepet AS nCodTitRepet,
          @nCodTitulo AS nCodTitulo,
          @nValorTitulo AS nValorTitulo,
          @cLiquidado AS cLiquidado,
          @nDesconto AS nDesconto,
          @nJuros AS nJuros,
          @nMulta AS nMulta,
          @nValAberto AS nValAberto,
          @nValLiquido AS nValLiquido,
          @nValPago AS nValPago
        ) AS source
        ON (target.nCodTitulo = source.nCodTitulo)
        WHEN MATCHED THEN
          UPDATE SET
            cCPFCNPJCliente = source.cCPFCNPJCliente,
            cCodCateg = source.cCodCateg,
            cGrupo = source.cGrupo,
            cNatureza = source.cNatureza,
            cNumParcela = source.cNumParcela,
            cOrigem = source.cOrigem,
            cStatus = source.cStatus,
            cTipo = source.cTipo,
            dDtEmissao = source.dDtEmissao,
            dDtPagamento = source.dDtPagamento,
            dDtPrevisao = source.dDtPrevisao,
            dDtRegistro = source.dDtRegistro,
            dDtVenc = source.dDtVenc,
            nCodCC = source.nCodCC,
            nCodCliente = source.nCodCliente,
            nCodTitRepet = source.nCodTitRepet,
            nCodTitulo = source.nCodTitulo,
            nValorTitulo = source.nValorTitulo,
            cLiquidado = source.cLiquidado,
            nDesconto = source.nDesconto,
            nJuros = source.nJuros,
            nMulta = source.nMulta,
            nValAberto = source.nValAberto,
            nValLiquido = source.nValLiquido,
            nValPago = source.nValPago
        WHEN NOT MATCHED THEN
          INSERT (
            cCPFCNPJCliente,
            cCodCateg,
            cGrupo,
            cNatureza,
            cNumParcela,
            cOrigem,
            cStatus,
            cTipo,
            dDtEmissao,
            dDtPagamento,
            dDtPrevisao,
            dDtRegistro,
            dDtVenc,
            nCodCC,
            nCodCliente,
            nCodTitRepet,
            nCodTitulo,
            nValorTitulo,
            cLiquidado,
            nDesconto,
            nJuros,
            nMulta,
            nValAberto,
            nValLiquido,
            nValPago
          )
          VALUES (
            cCPFCNPJCliente,
            cCodCateg,
            cGrupo,
            cNatureza,
            cNumParcela,
            cOrigem,
            cStatus,
            cTipo,
            dDtEmissao,
            dDtPagamento,
            dDtPrevisao,
            dDtRegistro,
            dDtVenc,
            nCodCC,
            nCodCliente,
            nCodTitRepet,
            nCodTitulo,
            nValorTitulo,
            cLiquidado,
            nDesconto,
            nJuros,
            nMulta,
            nValAberto,
            nValLiquido,
            nValPago
          );
      `;

      const values = {
        cCPFCNPJCliente: detalhes.cCPFCNPJCliente,
        cCodCateg: detalhes.cCodCateg,
        cGrupo: detalhes.cGrupo,
        cNatureza: detalhes.cNatureza,
        cNumParcela: detalhes.cNumParcela,
        cOrigem: detalhes.cOrigem,
        cStatus: detalhes.cStatus,
        cTipo: detalhes.cTipo,
        dDtEmissao: detalhes.dDtEmissao,
        dDtPagamento: detalhes.dDtPagamento,
        dDtPrevisao: detalhes.dDtPrevisao,
        dDtRegistro: detalhes.dDtRegistro,
        dDtVenc: detalhes.dDtVenc,
        nCodCC: detalhes.nCodCC,
        nCodCliente: detalhes.nCodCliente,
        nCodTitRepet: detalhes.nCodTitRepet,
        nCodTitulo: detalhes.nCodTitulo,
        nValorTitulo: detalhes.nValorTitulo,
        cLiquidado: resumo.cLiquidado,
        nDesconto: resumo.nDesconto,
        nJuros: resumo.nJuros,
        nMulta: resumo.nMulta,
        nValAberto: resumo.nValAberto,
        nValLiquido: resumo.nValLiquido,
        nValPago: resumo.nValPago,
      };

      //const log = `Release ${detalhes.nCodTitulo} inserted/updated successfully!`;
      //await requestSQL(pool, values, query, log);
    }
  }
};
