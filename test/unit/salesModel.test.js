const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../models/connection');
const salesModel = require('../../models/selesModel');

describe('2 - TESTES SALES MODEL', () => {
  describe('Busca todos as vendas no DB', () => {
    const getAllSalesMock =  [
      [
        {
          saleId: 1,
          date: "2021-09-09T04:54:29.000Z",
          product_id: 1,
          quantity: 2
        },
        {
          saleId: 1,
          date: "2021-09-09T04:54:54.000Z",
          product_id: 2,
          quantity: 2
        }
      ]
    ]

    beforeEach(async () => {
      sinon.stub(connection, 'execute').resolves(getAllSalesMock);
    });

    afterEach(async () => {
      connection.execute.restore();
    });

    it('retorna um array', async () => {
      const response = await salesModel.getAll();

      expect(response).to.be.an('array');
    });

    it('O objeto contém as chaves "saleId", "date", "product_id", "quantity"', async () => {
      const [response] = await salesModel.getAll();

      expect(response).to.contain.all.keys('saleId', 'date', 'product_id', 'quantity');
    });
  });

  describe('Procura uma venda pelo ID com sucesso', () => {
    const getAllSalesMock =  [
      [
        {
          date: "2021-09-09T04:54:29.000Z",
          product_id: 1,
          quantity: 2
        },
      ],
    ]

    const NUMBER_FOUR = 4;

    beforeEach(async () => {
      sinon.stub(connection, 'execute').resolves(getAllSalesMock);
    });

    afterEach(async () => {
      connection.execute.restore();
    });

    it('retorna um array quando o id da venda é passado corretamente', async () => {
      const response = await salesModel.getById(NUMBER_FOUR);

      expect(response).to.be.an('array');
    });

    it('O objeto retornado contém as chaves "date", "product_id", "quantity"', async () => {
      const [response] = await salesModel.getById(NUMBER_FOUR);

      expect(response).to.contain.all.keys('date', 'product_id', 'quantity');
    });
  });

  describe('Quando um ID de venda nao é passado corretamente', () => {
    const NUMBER_NINE = 9;

    beforeEach(async () => {
      sinon.stub(connection, 'execute').resolves([[]]);
    });

    afterEach(async () => {
      connection.execute.restore();
    });

    it('retorna null quando não acha uma venda com o ID informado', async () => {
      const response = await salesModel.getById(NUMBER_NINE);

      expect(response).to.be.null;
    });
  });

  describe('Quando atualiza uma venda com sucesso', () => {
    const mockSaleUpdate = [
      {
        product_id: 2,
        quantity: 10
      }
    ]
    const NUMBER_TWO = 2;

    beforeEach(async () => {
      sinon.stub(connection, 'execute').resolves(NUMBER_TWO);
    });

    afterEach(async () => {
      connection.execute.restore();
    });

    it('retorna o id do produto quando atualizado com sucesso', async () => {
      const response = await salesModel.update(NUMBER_TWO, mockSaleUpdate);

      expect(response).to.be.an('number');
      expect(response).to.equal(2);
    });
  });

  describe('Quando remove uma venda com sucesso', () => {
    const mockProductRemove = [
      {
        affectedRows: 1,
      }
    ]

    const NUMBER_THREE = 3;

    beforeEach(async () => {
      sinon.stub(connection, 'execute').resolves(mockProductRemove);
    });

    afterEach(async () => {
      connection.execute.restore();
    });

    it('retorna true caso uma venda tenha sido removida', async () => {
      const response = await salesModel.destroy(NUMBER_THREE);

      expect(response).to.be.an('boolean');
      expect(response).to.be.equal(true);
    });
  });

  describe('Quando a venda não é encontrada no db', () => {
    const mockProductRemove = [
      {
        affectedRows: 0,
      }
    ]

    const NUMBER_THREE = 3;

    beforeEach(async () => {
      sinon.stub(connection, 'execute').resolves(mockProductRemove);
    });

    afterEach(async () => {
      connection.execute.restore();
    });

    it('retorna null caso a venda com o id especifico nao tenha sido encontrada', async () => {
      const response = await salesModel.destroy(NUMBER_THREE);

      expect(response).to.be.equal(null);
    });
  });
});