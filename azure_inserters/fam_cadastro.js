import { requestSQL } from "./request_sql.js";
import { famCadastros } from "../fetchOmie/auxiliary_data.js";

export const insertFamCadastro = async (pool, dalt) => {
  const { famCadastro } = await famCadastros();

  for (let index = 0; index < famCadastro.length; index++) {
    const query = `
      MERGE INTO famCadastros AS target
      USING (SELECT 
        @codFamilia AS codFamilia,
        @codInt AS codInt, 
        @codigo AS codigo, 
        @inativo AS inativo,   
        @nomeFamilia AS nomeFamilia, 
        @dalt AS dalt
      ) AS source
      ON (target.codigo = source.codigo)
      WHEN MATCHED THEN
        UPDATE SET 
          codFamilia = source.codFamilia,
          codInt = source.codInt, 
          inativo = source.inativo,   
          nomeFamilia = source.nomeFamilia, 
          dalt = source.dalt
      WHEN NOT MATCHED THEN
        INSERT (codFamilia, codInt, codigo, inativo, nomeFamilia, dalt)
        VALUES ( source.codFamilia, source.codInt, source.codigo, source.inativo, source.nomeFamilia, source.dalt);
    `;

    const values = {
      codFamilia: famCadastro[index].codFamilia,
      codInt: famCadastro[index].codInt,
      codigo: famCadastro[index].codigo,
      inativo: famCadastro[index].inativo,
      nomeFamilia: famCadastro[index].nomeFamilia,
      dalt: dalt,
    };

    const log = `Familia ${famCadastro[index].nomeFamilia} inserted/updated successfully!`;

    await requestSQL(pool, values, query, log);
  }
};
