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

const update = async (id, { name, quantity }) => {
  const isValid = validateProductInfo(name, quantity);
  
  if (isValid.errCode) return isValid;

  const productExist = await productModel.getById(id);

  if (!productExist) {
    return {
      errCode: 404,
      message: 'Product not found',
    };
  }

  const updatedProduct = await productModel.update(id, { name, quantity });

  return updatedProduct;
};

const remove = async (id) => {
  const product = await productModel.getById(id);

  if (!product) {
    return {
      errCode: 404,
      message: 'Product not found',
    };
  }

  const productRemoved = await productModel.remove(id);

  return productRemoved;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};