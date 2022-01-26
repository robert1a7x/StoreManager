const blankName = (name) => !name;

const invalidLength = (name) => name.length < 5;

const blankQuantity = (quantity) => !quantity;

const invalidQuantity = (quantity) => {
  if (quantity < 0 || quantity === 0) return true;
  if (typeof quantity === 'string') return true;

  return false;
};

const validateProductInfo = (name, quantity) => {
  switch (true) {
    case blankName(name): return { errCode: 400, message: '"name" is required' };
    case invalidLength(name): 
    return { errCode: 422, message: '"name" length must be at least 5 characters long' };
    case invalidQuantity(quantity): 
    return { errCode: 422, message: '"quantity" must be a number larger than or equal to 1' };
    case blankQuantity(quantity): return { errCode: 400, message: '"quantity" is required' };
    default: return false;
  }
};

const blankId = (sales) => sales.some(({ productId }) => !productId);
const blankSaleQuantity = (sales) => sales.some(({ quantity }) => !quantity);
const InvalidSaleQuantity = (sales) => sales.some(({ quantity }) => invalidQuantity(quantity));

const validateSalesInfo = (sales) => {
  switch (true) {
    case blankId(sales):
      return { errCode: 400, message: '"product_id" is required' };
      case InvalidSaleQuantity(sales):
        return { errCode: 422, message: '"quantity" must be a number larger than or equal to 1' };
    case blankSaleQuantity(sales):
      return { errCode: 400, message: '"quantity" is required' };
    default:
      return false;
  }
};

module.exports = {
  validateProductInfo,
  validateSalesInfo,
};