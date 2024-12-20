CREATE TABLE vendedores (
  codInt VARCHAR(3),
  codigo BIGINT PRIMARY KEY,
  comissao NUMERIC, 
  inativo VARCHAR(1),
  nome VARCHAR(60),
  dalt VARCHAR(10)
);