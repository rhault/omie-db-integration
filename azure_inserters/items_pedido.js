import { requestSQL } from "./request_sql.js";

export const insertItemsPedido = async (pool, pedido, updated_at) => {
  const { numero_pedido, quantidade_itens } = pedido.cabecalho;
  const { det } = pedido;

  for (let item = 0; item < quantidade_itens; item++) {
    const { ide, produto } = det[item];

    const query = `
      MERGE INTO items_pedido AS target
      USING (SELECT
              @codigo_item AS codigo_item,
              @numero_pedido AS numero_pedido,
              @codigo_produto AS codigo_produto,
              @cfop AS cfop,
              @ncm AS ncm,
              @percentual_desconto AS percentual_desconto,
              @quantidade AS quantidade,
              @reservado AS reservado,
              @valor_deducao AS valor_deducao,
              @valor_desconto AS valor_desconto,
              @valor_mercadoria AS valor_mercadoria,
              @valor_total AS valor_total,
              @valor_unitario AS valor_unitario,
              @updated_at AS updated_at) AS source
      ON (target.codigo_item = source.codigo_item)
      WHEN MATCHED THEN
        UPDATE SET
          codigo_produto = source.codigo_produto,
          cfop = source.cfop,
          ncm = source.ncm,
          percentual_desconto = source.percentual_desconto,
          quantidade = source.quantidade,
          reservado = source.reservado,
          valor_deducao = source.valor_deducao,
          valor_desconto = source.valor_desconto,
          valor_mercadoria = source.valor_mercadoria,
          valor_total = source.valor_total,
          valor_unitario = source.valor_unitario,
          updated_at = source.updated_at
      WHEN NOT MATCHED THEN
        INSERT (
          codigo_item,
          numero_pedido,
          codigo_produto,
          cfop,
          ncm,
          percentual_desconto,
          quantidade,
          reservado,
          valor_deducao,
          valor_desconto,
          valor_mercadoria,
          valor_total,
          valor_unitario,
          updated_at
        )
        VALUES (
          source.codigo_item,
          source.numero_pedido,
          source.codigo_produto,
          source.cfop,
          source.ncm,
          source.percentual_desconto,
          source.quantidade,
          source.reservado,
          source.valor_deducao,
          source.valor_desconto,
          source.valor_mercadoria,
          source.valor_total,
          source.valor_unitario,
          source.updated_at
        );
    `;

    const values = {
      codigo_item: ide.codigo_item,
      numero_pedido,
      codigo_produto: produto.codigo_produto,
      cfop: produto.cfop,
      ncm: produto.ncm,
      percentual_desconto: produto.percentual_desconto,
      quantidade: produto.quantidade,
      reservado: produto.reservado,
      valor_deducao: produto.valor_deducao,
      valor_desconto: produto.valor_desconto,
      valor_mercadoria: produto.valor_mercadoria,
      valor_total: produto.valor_total,
      valor_unitario: produto.valor_unitario,
      updated_at: updated_at,
    };

    const log = `
    Order ${numero_pedido} item ${item + 1
      } / ${quantidade_itens} inserted/updated successfully!
    `;

    await requestSQL(pool, values, query, log);
  }
};
