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

module.exports = {
  create,
  nameAlreadyExists,
};