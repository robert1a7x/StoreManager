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

const getAll = async () => {
  const query = `SELECT sp.sale_id as saleId,
  s.date,
  sp.product_id,
  sp.quantity
  FROM sales_products AS sp
  INNER JOIN sales as s ON sp.sale_id = s.id;`;

  const [sales] = await connection.execute(query);

  return sales;
};

const getById = async (id) => {
  const query = `SELECT s.date,
  sp.product_id,
  sp.quantity
  FROM sales_products AS sp
  INNER JOIN sales as s ON sp.sale_id = s.id
  WHERE sale_id = ?`;

  const sale = await connection.execute(query, [id])
  .then(([result]) => (result.length ? result : null));

  if (!sale) return null;

  return sale;
};

const update = async (id, sale) => {
  const query = 'UPDATE sales_products SET product_id = ?, quantity = ? WHERE sale_id = ?';

  const promises = sale.map(async ({ productId, quantity }) => 
  connection.execute(query, [productId, quantity, id]));

  await Promise.all(promises);

  return id;
};

const destroy = async (id) => {
  const query = 'DELETE FROM sales WHERE id = ?';

  const [deletedSale] = await connection.execute(query, [id]);

  if (deletedSale.affectedRows === 0) return null;

  return true;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  destroy,
};