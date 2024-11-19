export const insertPedido = async (client, pedido) => {
  const query = `
    INSERT INTO pedido (
      numero_pedido, bloqueado, codigo_cenario_impostos, codigo_cliente, codigo_pedido, 
      data_previsao, etapa, qtde_parcelas, quantidade_itens, valor_frete,
      autorizado, cancelado, dAlt, dFat, dInc, denegado, devolvido,
      devolvido_parcial, faturado, hAlt, hFat, hInc, codProj, codVend,
      codigo_categoria, codigo_conta_corrente, consumidor_final, base_calculo_icms,
      valor_descontos, valor_mercadorias, valor_total_pedido
    )
    VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, 
      $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31
    )
  `;
  const values = [
    pedido.numero_pedido,
    pedido.bloqueado,
    pedido.codigo_cenario_impostos,
    pedido.codigo_cliente,
    pedido.codigo_pedido,
    pedido.data_previsao,
    pedido.etapa,
    pedido.qtde_parcelas,
    pedido.quantidade_itens,
    pedido.valor_frete,
    pedido.autorizado,
    pedido.cancelado,
    pedido.dAlt,
    pedido.dFat,
    pedido.dInc,
    pedido.denegado,
    pedido.devolvido,
    pedido.devolvido_parcial,
    pedido.faturado,
    pedido.hAlt,
    pedido.hFat,
    pedido.hInc,
    pedido.codProj,
    pedido.codVend,
    pedido.codigo_categoria,
    pedido.codigo_conta_corrente,
    pedido.consumidor_final,
    pedido.base_calculo_icms,
    pedido.valor_descontos,
    pedido.valor_mercadorias,
    pedido.valor_total_pedido,
  ];

  await client.query(query, values);
  console.log(`Pedido ${pedido.cabecalho.numero_pedido} inserido com sucesso!`);
};
