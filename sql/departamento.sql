CREATE TABLE departamentos (
  id SERIAL PRIMARY KEY,
  numero_pedido VARCHAR(15) REFERENCES pedido(numero_pedido) ON DELETE CASCADE,
  cCodDepto BIGINT, 
  nPerc NUMERIC, 
  nValor NUMERIC,
  dalt varchar(10)
);