CREATE  TABLE produtos (
  id SERIAL PRIMARY KEY,
  codigo VARCHAR(60),
  codigo_familia NUMERIC,
  codigo_produto NUMERIC,
  descricao VARCHAR(120),
  estoque_minimo NUMERIC,
  inativo VARCHAR(1),
  marca VARCHAR(60),
  quantidade_estoque NUMERIC,
  valor_unitario NUMERIC,
  dAlt VARCHAR(10),
  dInc VARCHAR(10)
)