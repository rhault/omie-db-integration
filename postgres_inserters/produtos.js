export const insertProdutos = async (client, products) => {
  for (const product of products) {
    const {
      codigo,
      codigo_familia,
      codigo_produto,
      descricao,
      estoque_minimo,
      inativo,
      info,
      marca,
      quantidade_estoque,
      valor_unitario,
    } = product;

    const { dAlt, dInc } = info;

    const query = `
        INSERT INTO produtos (
          codigo,
          codigo_familia,
          codigo_produto,
          descricao,
          estoque_minimo,
          inativo,
          marca,
          quantidade_estoque,
          valor_unitario,
          dAlt,
          dInc
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    `;

    await client.query(query, [
      codigo,
      codigo_familia,
      codigo_produto,
      descricao,
      estoque_minimo,
      inativo,
      marca,
      quantidade_estoque,
      valor_unitario,
      dAlt,
      dInc,
    ]);

    console.log(`Produto ${descricao} inserido com sucesso!`);
  }
};
