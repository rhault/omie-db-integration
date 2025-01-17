CREATE TABLE categorias (
  codigo VARCHAR(20) PRIMARY KEY,
  codigo_dre VARCHAR(10),
  conta_despesa VARCHAR(1),
  conta_inativa VARCHAR(1),
  conta_receita VARCHAR(1),
  codigoDRE VARCHAR(10),
  descricaoDRE VARCHAR(40),
  descricao VARCHAR(50),
  descricao_padrao VARCHAR(50),
  transferencia VARCHAR(1),
  /* delete column */
  dalt VARCHAR(10)
)