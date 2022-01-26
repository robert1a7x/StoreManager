const salesService = require('../services/salesService');

const create = async (req, res, next) => {
  const salesReq = req.body;

  const sales = await salesService.create(salesReq);

  if (sales.errCode) return next(sales);

  res.status(201).json(sales);
};

module.exports = {
  create,
};