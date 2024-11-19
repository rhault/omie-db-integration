export const insertItemsPedido = async (client, pedido, dalt) => {
  const { numero_pedido, quantidade_itens } = pedido.cabecalho
  const { det } = pedido
  
  for (let item = 0; item < quantidade_itens; item++) {
    const {ide, produto} = det[item]
    const query =` 
      INSERT INTO item_pedido (
        codigo_item,
        numero_pedido,
        codigo_produto,
        cfop,
        ncm,
        percentual_desconto,
        quantidade,
        eservado,
        valor_deducao,
        valor_desconto,
        valor_mercadoria,
        valor_total,
        valor_unitario,
        dAlt
      )
      VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14
      )
    `
    const values = [
      ide.codigo_item,
      numero_pedido,
      produto.codigo_produto,
      produto.cfop,
      produto.ncm,
      produto.percentual_desconto,
      produto.quantidade,
      produto.reservado,
      produto.valor_deducao,
      produto.valor_desconto,
      produto.valor_mercadoria,
      produto.valor_total,
      produto.valor_unitario,
      dalt,
    ]

    await client.query(query, values)
    console.log(`Pedido ${numero_pedido} item ${item+1} / ${quantidade_itens} inserido com sucesso!`)
  }
};
