const salesModel = require('../models/selesModel');
const { validateSalesInfo } = require('../helpers/validateProductCreation');

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

module.exports = {
  create,
  getAll,
  getById,
};