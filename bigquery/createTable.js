export const createTable = async (id, schema, bigquery, datasetId) => {
  const options = {
    schema: schema,
    location: "US",
  };

  console.log("Creating table...");
  const [table] = await bigquery.dataset(datasetId).createTable(id, options);

  console.log(`Table ${table.id} created.`);
};
