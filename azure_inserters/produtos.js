export const insertProdutos = async (pool, products) => {
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
      MERGE INTO produtos AS target
      USING (SELECT 
        @codigo AS codigo, 
        @codigo_familia AS codigo_familia,
        @codigo_produto AS codigo_produto, 
        @descricao AS descricao,
        @estoque_minimo AS estoque_minimo,
        @inativo AS inativo,
        @marca AS marca,
        @quantidade_estoque AS quantidade_estoque,
        @valor_unitario AS valor_unitario,
        @dAlt AS dAlt,
        @dInc AS dInc) AS source
      ON target.codigo_produto = source.codigo_produto
      WHEN MATCHED THEN
        UPDATE SET 
          descricao = source.descricao,
          estoque_minimo = source.estoque_minimo,
          inativo = source.inativo,
          marca = source.marca,
          quantidade_estoque = source.quantidade_estoque,
          valor_unitario = source.valor_unitario,
          dAlt = source.dAlt,
          dInc = source.dInc
      WHEN NOT MATCHED THEN
        INSERT (
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
        VALUES (
          source.codigo,
          source.codigo_familia,
          source.codigo_produto,
          source.descricao,
          source.estoque_minimo,
          source.inativo,
          source.marca,
          source.quantidade_estoque,
          source.valor_unitario,
          source.dAlt,
          source.dInc
        );
    `;

    await pool
      .request()
      .input("codigo", codigo)
      .input("codigo_familia", codigo_familia)
      .input("codigo_produto", codigo_produto)
      .input("descricao", descricao)
      .input("estoque_minimo", estoque_minimo)
      .input("inativo", inativo)
      .input("marca", marca)
      .input("quantidade_estoque", quantidade_estoque)
      .input("valor_unitario", valor_unitario)
      .input("dAlt", dAlt)
      .input("dInc", dInc)
      .query(query);

    console.log(`Product ${descricao} inserted/updated successfully!`);
  }
};
