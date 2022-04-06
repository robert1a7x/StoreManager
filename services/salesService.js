const salesModel = require('../models/selesModel');
const { validateSalesInfo } = require('../helpers/validateProductAndSales');

const serialize = (sales) => sales.map((sale) => ({
  productId: sale.product_id,
  quantity: sale.quantity,
}));

const create = async (sales) => {
  const serializedSales = serialize(sales);

  const isValid = validateSalesInfo(serializedSales);

  if (isValid.errCode) return isValid;

  const sale = await salesModel.create(serializedSales);

  return { id: sale, itemsSold: [...sales] };
};

const getAll = async () => {
  const sales = await salesModel.getAll();

  return sales;
};

const getById = async (id) => {
  const sale = await salesModel.getById(id);

  if (!sale) {
    return {
      errCode: 404,
      message: 'Sale not found',
    };
  }

  return sale;
};

const update = async (id, sale) => {
  const serializedSale = serialize(sale);

  const isValid = validateSalesInfo(serializedSale);

  if (isValid.errCode) return isValid;

  const saleExist = await salesModel.getById(id);

  if (!saleExist) {
    return {
      errCode: 404,
      message: 'Sale not found',
    };
  }

  const saleId = await salesModel.update(id, serializedSale);

  return { saleId, itemUpdated: [...sale] };
};

const destroy = async (id) => {
  const deletedSale = await salesModel.destroy(id);

  if (!deletedSale) {
    return {
      errCode: 404,
      message: 'Sale not found',
    };
  }

  return deletedSale;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  destroy,
};