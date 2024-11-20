CREATE TABLE famCadastros (
  id SERIAL PRIMARY KEY,
  codFamilia VARCHAR(50), 
  codInt VARCHAR(20), 
  codigo BIGINT, 
  inativo VARCHAR(1), 
  nomeFamilia VARCHAR(50), 
  dalt varchar(10)
)