export const insertParcelas = async (pool, pedido, dalt) => {
  const { numero_pedido } = pedido.cabecalho;
  const { parcela } = pedido.lista_parcelas;

  for (let parc = 0; parc < parcela.length; parc++) {
    const nParcela = parcela[parc];
    const id = `${numero_pedido}p${parc + 1}`;

    const values = {
      id,
      numero_pedido,
      data_vencimento: nParcela.data_vencimento,
      meio_pagamento: nParcela.meio_pagamento,
      numero_parcela: nParcela.numero_parcela,
      percentual: nParcela.percentual,
      quantidade_dias: nParcela.quantidade_dias,
      tipo_documento: nParcela.tipo_documento,
      valor: nParcela.valor,
      dAlt: dalt,
    };

    const query = `
      MERGE INTO parcelas AS target
      USING (SELECT 
        @id AS id, 
        @numero_pedido AS numero_pedido,
        @data_vencimento AS data_vencimento, 
        @meio_pagamento AS meio_pagamento, 
        @numero_parcela AS numero_parcela, 
        @percentual AS percentual, 
        @quantidade_dias AS quantidade_dias, 
        @tipo_documento AS tipo_documento, 
        @valor AS valor, 
        @dAlt AS dAlt) AS source
      ON target.id = source.id
      WHEN MATCHED THEN
        UPDATE SET 
          data_vencimento = source.data_vencimento,
          meio_pagamento = source.meio_pagamento,
          numero_parcela = source.numero_parcela,
          percentual = source.percentual,
          quantidade_dias = source.quantidade_dias,
          tipo_documento = source.tipo_documento,
          valor = source.valor,
          dAlt = source.dAlt
      WHEN NOT MATCHED THEN
        INSERT (
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
          source.id,
          source.numero_pedido,
          source.data_vencimento, 
          source.meio_pagamento, 
          source.numero_parcela, 
          source.percentual, 
          source.quantidade_dias, 
          source.tipo_documento, 
          source.valor,
          source.dAlt
        );
    `;
    try {
      const request = pool.request();

      // Adiciona os parametros
      Object.keys(values).forEach((key) => {
        request.input(key, values[key]);
      });

      // Executa a query
      await request.query(query);
      console.log(
        `Order ${numero_pedido} quota ${parc + 1} / ${
          parcela.length
        } inserted/updated successfully!`
      );
    } catch (err) {
      console.error("Error inserting order:", err.message);
    }
  }
};
