export const insertPedido = async (pool, pedido) => {
  const {
    cabecalho,
    infoCadastro,
    informacoes_adicionais,
    frete,
    total_pedido,
  } = pedido;

  const query = `
    MERGE INTO pedidos AS target
    USING (VALUES (
      @numero_pedido, @bloqueado, @codigo_cenario_impostos, @codigo_cliente, @codigo_pedido, 
      @data_previsao, @etapa, @qtde_parcelas, @quantidade_itens, @valor_frete, @autorizado, 
      @cancelado, @dAlt, @dFat, @dInc, @denegado, @devolvido, @devolvido_parcial, @faturado, 
      @hAlt, @hFat, @hInc, @codProj, @codVend, @codigo_categoria, @codigo_conta_corrente, 
      @consumidor_final, @base_calculo_icms, @valor_descontos, @valor_mercadorias, @valor_total_pedido
    )) AS source (
      numero_pedido, bloqueado, codigo_cenario_impostos, codigo_cliente, codigo_pedido, 
      data_previsao, etapa, qtde_parcelas, quantidade_itens, valor_frete, autorizado, 
      cancelado, dAlt, dFat, dInc, denegado, devolvido, devolvido_parcial, faturado, 
      hAlt, hFat, hInc, codProj, codVend, codigo_categoria, codigo_conta_corrente, 
      consumidor_final, base_calculo_icms, valor_descontos, valor_mercadorias, valor_total_pedido
    )
    ON target.numero_pedido = source.numero_pedido
    WHEN MATCHED THEN 
      UPDATE SET 
        bloqueado = source.bloqueado,
        codigo_cenario_impostos = source.codigo_cenario_impostos,
        codigo_cliente = source.codigo_cliente,
        codigo_pedido = source.codigo_pedido,
        data_previsao = source.data_previsao,
        etapa = source.etapa,
        qtde_parcelas = source.qtde_parcelas,
        quantidade_itens = source.quantidade_itens,
        valor_frete = source.valor_frete,
        autorizado = source.autorizado,
        cancelado = source.cancelado,
        dAlt = source.dAlt,
        dFat = source.dFat,
        dInc = source.dInc,
        denegado = source.denegado,
        devolvido = source.devolvido,
        devolvido_parcial = source.devolvido_parcial,
        faturado = source.faturado,
        hAlt = source.hAlt,
        hFat = source.hFat,
        hInc = source.hInc,
        codProj = source.codProj,
        codVend = source.codVend,
        codigo_categoria = source.codigo_categoria,
        codigo_conta_corrente = source.codigo_conta_corrente,
        consumidor_final = source.consumidor_final,
        base_calculo_icms = source.base_calculo_icms,
        valor_descontos = source.valor_descontos,
        valor_mercadorias = source.valor_mercadorias,
        valor_total_pedido = source.valor_total_pedido
    WHEN NOT MATCHED THEN 
      INSERT (
        numero_pedido, bloqueado, codigo_cenario_impostos, codigo_cliente, codigo_pedido, 
        data_previsao, etapa, qtde_parcelas, quantidade_itens, valor_frete, autorizado, 
        cancelado, dAlt, dFat, dInc, denegado, devolvido, devolvido_parcial, faturado, 
        hAlt, hFat, hInc, codProj, codVend, codigo_categoria, codigo_conta_corrente, 
        consumidor_final, base_calculo_icms, valor_descontos, valor_mercadorias, valor_total_pedido
      )
      VALUES (
        source.numero_pedido, source.bloqueado, source.codigo_cenario_impostos, source.codigo_cliente, 
        source.codigo_pedido, source.data_previsao, source.etapa, source.qtde_parcelas, 
        source.quantidade_itens, source.valor_frete, source.autorizado, source.cancelado, 
        source.dAlt, source.dFat, source.dInc, source.denegado, source.devolvido, 
        source.devolvido_parcial, source.faturado, source.hAlt, source.hFat, source.hInc, 
        source.codProj, source.codVend, source.codigo_categoria, source.codigo_conta_corrente, 
        source.consumidor_final, source.base_calculo_icms, source.valor_descontos, 
        source.valor_mercadorias, source.valor_total_pedido
      );
  `;

  const values = {
    numero_pedido: cabecalho.numero_pedido,
    bloqueado: cabecalho.bloqueado,
    codigo_cenario_impostos: cabecalho.codigo_cenario_impostos,
    codigo_cliente: cabecalho.codigo_cliente,
    codigo_pedido: cabecalho.codigo_pedido,
    data_previsao: cabecalho.data_previsao,
    etapa: cabecalho.etapa,
    qtde_parcelas: cabecalho.qtde_parcelas,
    quantidade_itens: cabecalho.quantidade_itens,
    valor_frete: frete.valor_frete,
    autorizado: infoCadastro.autorizado,
    cancelado: infoCadastro.cancelado,
    dAlt: infoCadastro.dAlt,
    dFat: infoCadastro.dFat,
    dInc: infoCadastro.dInc,
    denegado: infoCadastro.denegado,
    devolvido: infoCadastro.devolvido,
    devolvido_parcial: infoCadastro.devolvido_parcial,
    faturado: infoCadastro.faturado,
    hAlt: infoCadastro.hAlt,
    hFat: infoCadastro.hFat,
    hInc: infoCadastro.hInc,
    codProj: informacoes_adicionais.codProj,
    codVend: informacoes_adicionais.codVend,
    codigo_categoria: informacoes_adicionais.codigo_categoria,
    codigo_conta_corrente: informacoes_adicionais.codigo_conta_corrente,
    consumidor_final: informacoes_adicionais.consumidor_final,
    base_calculo_icms: total_pedido.base_calculo_icms,
    valor_descontos: total_pedido.valor_descontos,
    valor_mercadorias: total_pedido.valor_mercadorias,
    valor_total_pedido: total_pedido.valor_total_pedido,
  };

  try {
    const request = pool.request();

    // Adiciona os parametros
    Object.keys(values).forEach((key) => {
      request.input(key, values[key]);
    });

    // Executa a query
    await request.query(query);
    console.log(
      `Orders  ${pedido.cabecalho.numero_pedido} inserted/updated successfully!`
    );
  } catch (err) {
    console.error("Error inserting order:", err.message);
  }
};
