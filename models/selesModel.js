const connection = require('./connection');

const create = async (sales) => {
  const createSaleDate = 'INSERT INTO sales (id) VALUES (DEFAULT)';
  const [{ insertId }] = await connection.execute(createSaleDate);

  const createQuery = 'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)';

  const promises = sales.map(async ({ productId, quantity }) => 
    connection.execute(createQuery, [insertId, productId, quantity]));

  await Promise.all(promises);

  return insertId;
};

module.exports = {
  create,
};