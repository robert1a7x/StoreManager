const salesService = require('../services/salesService');

const create = async (req, res, next) => {
  const salesReq = req.body;

  const sales = await salesService.create(salesReq);

  if (sales.errCode) return next(sales);

  return res.status(201).json(sales);
};

const getAll = async (_req, res) => {
  const sales = await salesService.getAll();

  return res.status(200).json(sales);
};

const getById = async (req, res, next) => {
  const { id } = req.params;

  const sale = await salesService.getById(+id);

  if (sale.errCode) return next(sale);

  return res.status(200).json(sale);
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const saleReq = req.body;

  const updatedSale = await salesService.update(+id, saleReq);

  if (updatedSale.errCode) return next(updatedSale);

  return res.status(200).json(updatedSale);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
};