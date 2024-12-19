export const insertPedido = async (client, pedido) => {
  const {
    cabecalho,
    infoCadastro,
    informacoes_adicionais,
    frete,
    total_pedido,
  } = pedido;
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
    ON CONFLICT (numero_pedido) DO UPDATE
    SET 
      bloqueado = EXCLUDED.bloqueado,
      codigo_cenario_impostos = EXCLUDED.codigo_cenario_impostos,
      codigo_cliente = EXCLUDED.codigo_cliente,
      codigo_pedido = EXCLUDED.codigo_pedido,
      data_previsao = EXCLUDED.data_previsao,
      etapa = EXCLUDED.etapa,
      qtde_parcelas = EXCLUDED.qtde_parcelas,
      quantidade_itens = EXCLUDED.quantidade_itens,
      valor_frete = EXCLUDED.valor_frete,
      autorizado = EXCLUDED.autorizado,
      cancelado = EXCLUDED.cancelado,
      dAlt = EXCLUDED.dAlt,
      dFat = EXCLUDED.dFat,
      dInc = EXCLUDED.dInc,
      denegado = EXCLUDED.denegado,
      devolvido = EXCLUDED.devolvido,
      devolvido_parcial = EXCLUDED.devolvido_parcial,
      faturado = EXCLUDED.faturado,
      hAlt = EXCLUDED.hAlt,
      hFat = EXCLUDED.hFat,
      hInc = EXCLUDED.hInc,
      codProj = EXCLUDED.codProj,
      codVend = EXCLUDED.codVend,
      codigo_categoria = EXCLUDED.codigo_categoria,
      codigo_conta_corrente = EXCLUDED.codigo_conta_corrente,
      consumidor_final = EXCLUDED.consumidor_final,
      base_calculo_icms = EXCLUDED.base_calculo_icms,
      valor_descontos = EXCLUDED.valor_descontos,
      valor_mercadorias = EXCLUDED.valor_mercadorias,
      valor_total_pedido = EXCLUDED.valor_total_pedido
  `;
  const values = [
    cabecalho.numero_pedido,
    cabecalho.bloqueado,
    cabecalho.codigo_cenario_impostos,
    cabecalho.codigo_cliente,
    cabecalho.codigo_pedido,
    cabecalho.data_previsao,
    cabecalho.etapa,
    cabecalho.qtde_parcelas,
    cabecalho.quantidade_itens,
    frete.valor_frete,
    infoCadastro.autorizado,
    infoCadastro.cancelado,
    infoCadastro.dAlt,
    infoCadastro.dFat,
    infoCadastro.dInc,
    infoCadastro.denegado,
    infoCadastro.devolvido,
    infoCadastro.devolvido_parcial,
    infoCadastro.faturado,
    infoCadastro.hAlt,
    infoCadastro.hFat,
    infoCadastro.hInc,
    informacoes_adicionais.codProj,
    informacoes_adicionais.codVend,
    informacoes_adicionais.codigo_categoria,
    informacoes_adicionais.codigo_conta_corrente,
    informacoes_adicionais.consumidor_final,
    total_pedido.base_calculo_icms,
    total_pedido.valor_descontos,
    total_pedido.valor_mercadorias,
    total_pedido.valor_total_pedido,
  ];

  await client.query(query, values);
  console.log(`Pedido ${pedido.cabecalho.numero_pedido} inserido com sucesso!`);
};
