import { requestSQL } from "./request_sql.js";
import { meiosPagamento } from "../fetchOmie/auxiliary_data.js";

const { tipo_documento_cadastro } = await meiosPagamento();

export const insertMeiosPagamentos = async (pool, dalt) => {
  for (let index = 0; index < tipo_documento_cadastro.length; index++) {
    const query =
      "INSERT INTO meiosPagamento (codigo, descricao, dalt) VALUES (@codigo, @descricao, @dalt)";

    const values = {
      codigo: tipo_documento_cadastro[index].codigo,
      descricao: tipo_documento_cadastro[index].descricao,
      dalt: dalt,
    };

    const log = `Payment method: ${tipo_documento_cadastro[index].descricao} - entered successfully`;

    await requestSQL(pool, values, query, log);
  }
};
