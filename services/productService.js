const productModel = require('../models/productModel');
const { validateProductInfo } = require('../helpers/validateProductCreation');

const create = async (name, quantity) => {
  const isValid = validateProductInfo(name, quantity);
  
  if (isValid.errCode) return isValid;
  
  const nameExists = await productModel.nameAlreadyExists(name);

  if (nameExists) {
    return {
      errCode: 409,
      message: 'Product already exists',
    };
  }

  const createdProduct = await productModel.create({ name, quantity });

  return createdProduct;
};

const getAll = async () => {
  const products = await productModel.getAll();

  return products;
};

const getById = async (id) => {
  const product = await productModel.getById(id);

  if (!product) {
    return {
      errCode: 404,
      message: 'Product not found',
    };
  }
  
  return product;
};

module.exports = {
  create,
  getAll,
  getById,
};