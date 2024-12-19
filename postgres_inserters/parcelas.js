export const insertParcelas = async (client, pedido, dalt) => {
  const { numero_pedido } = pedido.cabecalho;
  const { parcela } = pedido.lista_parcelas;

  for (let parc = 0; parc < parcela.length; parc++) {
    const nParcela = parcela[parc];
    const id = `${numero_pedido}p${parc + 1}`;

    const values = [
      id,
      numero_pedido,
      nParcela.data_vencimento,
      nParcela.meio_pagamento,
      nParcela.numero_parcela,
      nParcela.percentual,
      nParcela.quantidade_dias,
      nParcela.tipo_documento,
      nParcela.valor,
      dalt,
    ];

    const query = `
        INSERT INTO parcela (
          id,
          numero_pedido,
          data_vencimento, 
          meio_pagamento, 
          numero_parcela, 
          percentual, 
          quantidade_dias, 
          tipo_documento, 
          valor,
          dAlt
        )
        VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
        )
        ON CONFLICT ( id ) DO UPDATE
        SET 
          data_vencimento = EXCLUDED.data_vencimento,
          meio_pagamento = EXCLUDED.meio_pagamento,
          numero_parcela = EXCLUDED.numero_parcela,
          percentual = EXCLUDED.percentual,
          quantidade_dias = EXCLUDED.quantidade_dias,
          tipo_documento = EXCLUDED.tipo_documento,
          valor = EXCLUDED.valor,
          dAlt = EXCLUDED.dAlt
      `;

    await client.query(query, values);

    console.log(
      `Pedido ${numero_pedido} parcela ${parc + 1} / ${
        parcela.length
      } inserida com sucesso!`
    );
  }
};
