export const itemPedidosSchema = [
  { name: "codigo_item", type: "integer", mode: "REQUIRED" },
  { name: "numero_pedido", type: "integer" },
  { name: "codigo_produto", type: "integer" },
  { name: "cfop", type: "float" },
  { name: "ncm", type: "string" },
  { name: "percentual_desconto", type: "float" },
  { name: "quantidade", type: "integer" },
  { name: "reservado", type: "boolean" },
  { name: "valor_deducao", type: "integer" },
  { name: "valor_desconto", type: "float" },
  { name: "valor_mercadoria", type: "float" },
  { name: "valor_total", type: "float" },
  { name: "valor_unitario", type: "float" },
  { name: "dalt", type: "date" },
];

//mode NULLABLE, REQUIRED, REPEATED
