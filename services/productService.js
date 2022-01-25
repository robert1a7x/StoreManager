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

module.exports = {
  create,
};