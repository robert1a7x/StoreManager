const productService = require('../services/productService');

const create = async (req, res, next) => {
  const { name, quantity } = req.body;

  const product = await productService.create(name, quantity);

  if (product.errCode) return next(product);

  return res.status(201).json(product);
};

module.exports = {
  create,
};