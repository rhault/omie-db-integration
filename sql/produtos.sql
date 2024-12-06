CREATE  TABLE produtos (
  codigo VARCHAR(60),
  codigo_familia NUMERIC,
  codigo_produto NUMERIC PRIMARY KEY,
  descricao VARCHAR(120),
  estoque_minimo NUMERIC,
  inativo VARCHAR(1),
  marca VARCHAR(60),
  quantidade_estoque NUMERIC,
  valor_unitario NUMERIC,
  dAlt VARCHAR(10),
  dInc VARCHAR(10)
)