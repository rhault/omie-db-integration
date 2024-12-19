CREATE TABLE parcelas (
    id VARCHAR(20) PRIMARY KEY,
    numero_pedido VARCHAR(15) REFERENCES pedido(numero_pedido) ON DELETE CASCADE,
    data_vencimento VARCHAR(10),
    meio_pagamento INT,
    numero_parcela INT,
    percentual NUMERIC,
    quantidade_dias INT,
    tipo_documento VARCHAR(15),
    valor NUMERIC,
    dAlt VARCHAR(10)
)