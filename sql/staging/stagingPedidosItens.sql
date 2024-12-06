CREATE TABLE stagingPedidosItens (
  codigo_item BIGINT PRIMARY KEY,
  numero_pedido VARCHAR(15) REFERENCES pedido(numero_pedido) ON DELETE CASCADE,
  codigo_produto BIGINT,
  cfop VARCHAR(20),
  ncm VARCHAR(50),
  percentual_desconto NUMERIC,
  quantidade INT,
  reservado CHAR(1),
  valor_deducao NUMERIC,
  valor_desconto NUMERIC,
  valor_mercadoria NUMERIC,
  valor_total NUMERIC,
  valor_unitario NUMERIC,
  dAlt varchar(10)
);