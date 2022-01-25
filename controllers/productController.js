const productService = require('../services/productService');

const create = async (req, res, next) => {
  const { name, quantity } = req.body;

  const product = await productService.create(name, quantity);

  if (product.errCode) return next(product);

  return res.status(201).json(product);
};

const getAll = async (_req, res) => {
  const products = await productService.getAll();

  res.status(200).json(products);
};

const getById = async (req, res, next) => {
  const { id } = req.params;

  const product = await productService.getById(+id);

  if (product.errCode) return next(product);

  return res.status(200).json(product);
};

module.exports = {
  create,
  getAll,
  getById,
};