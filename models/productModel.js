const connection = require('./connection');

const nameAlreadyExists = async (name) => {
  const query = 'SELECT * FROM products WHERE name = ?';

  const [result] = await connection.execute(query, [name]);

  if (result.length === 0) return null;
  
  return result;
};

const create = async ({ name, quantity }) => {
  const query = 'INSERT INTO products (name, quantity) VALUES (?, ?)';

  const [product] = await connection.execute(query, [name, quantity]);

  return {
    id: product.insertId,
    name,
    quantity,
  };
};

const getAll = async () => {
  const [products] = await connection.execute('SELECT * FROM products');

  return products;
};

const getById = async (id) => {
  const query = 'SELECT * FROM products WHERE id = ?';

  const product = await connection.execute(query, [id])
  .then(([result]) => (result.length ? result[0] : null));

  if (!product) return null;

  return product;
};

const update = async (id, { name, quantity }) => {
  const query = 'UPDATE products SET name = ?, quantity = ? WHERE id = ?';

  await connection.execute(query, [name, quantity, id]);

  return {
    id,
    name,
    quantity,
  };
};

module.exports = {
  create,
  nameAlreadyExists,
  getAll,
  getById,
  update,
};