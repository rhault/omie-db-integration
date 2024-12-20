export const requestSQL = async (pool, values, query, log) => {
  try {
    const request = await pool.request();

    // Adiciona os parametros
    Object.keys(values).forEach((key) => {
      request.input(key, values[key]);
    });

    // Executa a query
    await request.query(query);
    console.log(log);
  } catch (err) {
    console.error("Error inserting (request):", err.message);
  }
};
