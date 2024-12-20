import { requestSQL } from "./request_sql.js";
import { projeto } from "../fetchOmie/auxiliary_data.js";

export const insertProjetos = async (pool) => {
  const { cadastro } = await projeto();

  for (let index = 0; index < cadastro.length; index++) {
    const query = `
      MERGE INTO projetos AS target
      USING (SELECT 
        @codInt AS codInt,
        @codigo AS codigo, 
        @inativo AS inativo, 
        @data_alt AS data_alt,
        @hora_alt AS hora_alt,
        @nome AS nome
      ) AS source
      ON (target.codigo = source.codigo)
      WHEN MATCHED THEN
        UPDATE SET 
          codInt = source.codInt,
          inativo = source.inativo,   
          data_alt = source.data_alt, 
          hora_alt = source.hora_alt,
          nome = source.nome 
      WHEN NOT MATCHED THEN
        INSERT (codInt, codigo, inativo, data_alt, hora_alt, nome)
        VALUES ( source.codInt, source.codigo, source.inativo, source.data_alt, source.hora_alt, source.nome);
    `;

    const values = {
      codInt: cadastro[index].codInt,
      codigo: cadastro[index].codigo,
      inativo: cadastro[index].inativo,
      data_alt: cadastro[index].info.data_alt,
      hora_alt: cadastro[index].info.hora_alt,
      nome: cadastro[index].nome,
    };

    const log = `Projeto ${cadastro[index].nome} inserted/updated successfully!`;

    await requestSQL(pool, values, query, log);
  }
};
