const sinon = require('sinon');
const { expect } = require('chai');

const productModel = require('../../models/productModel');
const productService = require('../../services/productService');

describe('1 - TESTES PRODUCTS SERVICE', () => {
  describe('Busca todos os produtos no DB da camada model', () => {
    const getAllMock = [
      {
        id: 1,
        name: 'produto A',
        quantity: 10
      },
      {
        id: 2,
        name: 'produto B',
        quantity: 20
      }
    ]

    before(async () => {
      sinon.stub(productModel, 'getAll').resolves(getAllMock);
    });

    after(async () => {
      productModel.getAll.restore();
    });

    it('retorna um array', async () => {
      const response = await productService.getAll();

      expect(response).to.be.an('array');
    });

    it('O array retornado contém objetos com as chaves "id", "name", "quantity"', async () => {
      const [response] = await productService.getAll();

      expect(response).to.contain.all.keys('id', 'name', 'quantity');
    });
  });

  describe('Procura um produto pelo ID com sucesso', () => {
    const mockProductById =  {
      id: 1,
      name: 'Cerveja',
      quantity: 6,
    }

    const NUMBER_ONE = 1;

    before(async () => {
      sinon.stub(productModel, 'getById').resolves(mockProductById);
    });

    after(async () => {
      productModel.getById.restore();
    });

    it('retorna um objeto quando o id é passado corretamente', async () => {
      const response = await productService.getById(NUMBER_ONE);

      expect(response).to.be.an('object');
    });

    it('O objeto retornado contém as chaves "id", "name", "quantity"', async () => {
      const response = await productService.getById(NUMBER_ONE);

      expect(response).to.contain.all.keys('id', 'name', 'quantity');
    });
  });

  describe('Quando um ID nao é passado corretamente', () => {
    const NUMBER_TEN = 10;

    before(async () => {
      sinon.stub(productModel, 'getById').resolves(null);
    });

    after(async () => {
      productModel.getById.restore();
    });

    it('retorna um objeto de erro com status de nao encontrado', async () => {
      const response = await productService.getById(NUMBER_TEN);

      expect(response).to.contain.all.keys('errCode', 'message');
    });
  });
});