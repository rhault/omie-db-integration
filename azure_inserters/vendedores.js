import { requestSQL } from "./request_sql.js";
import { vendedores } from "../fetchOmie/auxiliary_data.js";

export const insertVendedores = async (pool, dalt) => {
  const { cadastro } = await vendedores();

  for (let index = 0; index < cadastro.length; index++) {
    const query = `
      MERGE INTO vendedores AS target
      USING (SELECT 
        @codInt AS codInt,
        @codigo AS codigo, 
        @comissao AS comissao,   
        @inativo AS inativo, 
        @nome AS nome,
        @dalt AS dalt
      ) AS source
      ON (target.codigo = source.codigo)
      WHEN MATCHED THEN
        UPDATE SET 
          codInt = source.codInt,
          comissao = source.comissao, 
          inativo = source.inativo,   
          nome = source.nome, 
          dalt = source.dalt
      WHEN NOT MATCHED THEN
        INSERT (codInt, codigo, comissao, inativo, nome, dalt)
        VALUES ( source.codInt, source.codigo, source.comissao, source.inativo, source.nome, source.dalt);
    `;

    const values = {
      codInt: cadastro[index].codInt,
      codigo: cadastro[index].codigo,
      comissao: cadastro[index].comissao,
      inativo: cadastro[index].inativo,
      nome: cadastro[index].nome,
      dalt: dalt,
    };

    const log = `Vendedor ${cadastro[index].nome} inserted/updated successfully!`;

    await requestSQL(pool, values, query, log);
  }
};
