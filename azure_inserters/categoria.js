import { requestSQL } from "./request_sql.js";
import { categorias } from "../fetchOmie/auxiliary_data.js";

export const insertCategorias = async (pool, dalt) => {
  const { categoria_cadastro } = await categorias();

  for (let categoria of categoria_cadastro) {
    const query = `
      MERGE INTO categorias AS target
      USING (SELECT
        @codigo AS codigo,
        @codigo_dre AS codigo_dre,
        @conta_despesa AS conta_despesa,
        @conta_inativa AS conta_inativa,
        @conta_receita AS conta_receita,
        @codigoDRE AS codigoDRE,
        @descricaoDRE AS descricaoDRE,
        @descricao AS descricao,
        @transferencia AS transferencia,
        @dalt AS dalt
      ) AS source
      ON (target.codigo = source.codigo)
      WHEN MATCHED THEN
        UPDATE SET 
          codigo = source.codigo,
          codigo_dre = source.codigo_dre,
          conta_despesa = source.conta_despesa,
          conta_inativa = source.conta_inativa,
          conta_receita = source.conta_receita,
          codigoDRE = source.codigoDRE,
          descricaoDRE = source.descricaoDRE,
          descricao = source.descricao,
          transferencia = source.transferencia,
          dalt = source.dalt
      WHEN NOT MATCHED THEN
        INSERT (
          codigo,
          codigo_dre,
          conta_despesa,
          conta_inativa,
          conta_receita,
          codigoDRE,
          descricaoDRE,
          descricao,
          transferencia,
          dalt
        )
        VALUES ( 
          codigo,
          codigo_dre,
          conta_despesa,
          conta_inativa,
          conta_receita,
          codigoDRE,
          descricaoDRE,
          descricao,
          transferencia,
          dalt
        );
    `;

    console.log(categoria);

    const values = {
      codigo: categoria.codigo,
      codigo_dre: categoria.codigo_dre,
      conta_despesa: categoria.conta_despesa,
      conta_inativa: categoria.conta_inativa,
      conta_receita: categoria.conta_receita,
      codigoDRE: categoria.dadosDRE?.codigoDRE || 0,
      descricaoDRE: categoria.dadosDRE?.descricaoDRE || 0,
      descricao: categoria.descricao,
      transferencia: categoria.transferencia,
      dalt: dalt,
    };

    //const log = `Categories ${categoria.codigo} inserted/updated successfully!`;
    //await requestSQL(pool, values, query, log);
  }
};

export const insertCtgTotalizadora = async (pool, dalt) => {
  const { categoria_cadastro } = await categorias("N");

  for (let categoria of categoria_cadastro) {
    if (
      categoria.totalizadora === "S" &&
      categoria.definida_pelo_usuario === "N"
    ) {
      const query = `
      MERGE INTO ctgTotalizadora AS target
      USING (SELECT
        @codigo AS codigo,
        @categoria_superior AS categoria_superior,
        @descricao AS descricao,
        @totalizadora AS totalizadora,                
        @dalt AS dalt
        ) AS source
        ON (target.codigo = source.codigo)
        WHEN MATCHED THEN
        UPDATE SET 
        categoria_superior = source.categoria_superior,
        descricao = source.descricao,
        totalizadora = source.totalizadora,
        dalt = source.dalt
        WHEN NOT MATCHED THEN
        INSERT (
          codigo,
          categoria_superior,
          descricao,
          totalizadora,
          dalt
        )
        VALUES ( 
          codigo,
          categoria_superior,
          descricao,
          totalizadora,
          dalt
        );
      `;

      const values = {
        codigo: categoria.codigo,
        categoria_superior: categoria.categoria_superior,
        descricao: categoria.descricao,
        totalizadora: categoria.totalizadora,
        dalt: dalt,
      };

      const log = `Categories ${categoria.codigo} inserted/updated successfully!`;
      await requestSQL(pool, values, query, log);
    }
  }
};
