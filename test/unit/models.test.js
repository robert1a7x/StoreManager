const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../models/connection');
const productModel = require('../../models/productModel');
const salesModel = require('../../models/selesModel');

describe('1 - TESTES PRODUCT MODEL', () => {
  describe('Insere um novo produto no DB', () => {
    const mockProduct = {
      id: 1,
      name: 'Cerveja',
      quantity: 6,
    }

    beforeEach(async () => {
      const execute = [{ insertId: 1 }];

      sinon.stub(connection, 'execute').resolves(execute);
    });

    afterEach(async () => {
      connection.execute.restore();
    });

    it('retorna um objeto quando os dados são inseridos corretamente', async () => {
      const response = await productModel.create(mockProduct);

      expect(response).to.be.an('object');
    });

    it('O objeto possui a propriedade "id" quando os dados estão corretos', async () => {
      const response = await productModel.create(mockProduct);

      expect(response).to.have.a.property('id');
    });
  });

  describe('Busca todos os produtos no DB', () => {
    const getAllMock = [
      [
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
      ],
    ]

    beforeEach(async () => {
      sinon.stub(connection, 'execute').resolves(getAllMock);
    });

    afterEach(async () => {
      connection.execute.restore();
    });

    it('retorna um array', async () => {
      const response = await productModel.getAll();

      expect(response).to.be.an('array');
    });

    it('O array retornado contém objetos com as chaves "id", "name", "quantity"', async () => {
      const [response] = await productModel.getAll();

      expect(response).to.contain.all.keys('id', 'name', 'quantity');
    });
  });

  describe('Procura um produto pelo ID com sucesso', () => {
    const mockProductById = [
      [
        {
          id: 1,
          name: 'Cerveja',
          quantity: 6,
        }
      ]
    ]

    const NUMBER_ONE = 1;

    beforeEach(async () => {
      sinon.stub(connection, 'execute').resolves(mockProductById);
    });

    afterEach(async () => {
      connection.execute.restore();
    });

    it('retorna um objeto quando o id é passado corretamente', async () => {
      const response = await productModel.getById(NUMBER_ONE);

      expect(response).to.be.an('object');
    });

    it('O objeto retornado contém as chaves "id", "name", "quantity"', async () => {
      const response = await productModel.getById(NUMBER_ONE);

      expect(response).to.contain.all.keys('id', 'name', 'quantity');
    });
  });

  describe('Quando um ID nao é passado corretamente', () => {
    const NUMBER_TEN = 10;

    beforeEach(async () => {
      sinon.stub(connection, 'execute').resolves([[]]);
    });

    afterEach(async () => {
      connection.execute.restore();
    });

    it('retorna null quando não acha um produto com o ID informado', async () => {
      const response = await productModel.getById(NUMBER_TEN);

      expect(response).to.be.null;
    });
  });

  describe('Quando atualiza um produto com sucesso', () => {
    const mockProductUpdate = {
      id: 2,
      name: 'Cerveja',
      quantity: 6,
    }

    const NUMBER_TWO = 2;

    beforeEach(async () => {
      sinon.stub(connection, 'execute').resolves(mockProductUpdate);
    });

    afterEach(async () => {
      connection.execute.restore();
    });

    it('retorna um objeto quando é atualizado corretamente', async () => {
      const response = await productModel.update(NUMBER_TWO, mockProductUpdate);

      expect(response).to.be.an('object');
    });

    it('O objeto da atualização retornado contém as chaves "id", "name", "quantity"', async () => {
      const response = await productModel.update(NUMBER_TWO, mockProductUpdate);

      expect(response).to.contain.all.keys('id', 'name', 'quantity');
    });
  });

  describe('Quando remove um produto com sucesso', () => {
    const mockProductRemove = [
      [
        {
          id: 3,
          name: 'Cerveja',
          quantity: 6,
        }
      ]
    ]

    const NUMBER_THREE = 3;

    beforeEach(async () => {
      sinon.stub(connection, 'execute').resolves(mockProductRemove);
    });

    afterEach(async () => {
      connection.execute.restore();
    });

    it('retorna um objeto com os dados do objeto removido', async () => {
      const response = await productModel.remove(NUMBER_THREE);

      expect(response).to.be.an('object');
    });

    it('O objeto da remoção retornado contém as chaves "id", "name", "quantity"', async () => {
      const response = await productModel.remove(NUMBER_THREE);

      expect(response).to.contain.all.keys('id', 'name', 'quantity');
    });
  });

  describe('Procura um produto pelo "Nome" com sucesso', () => {
    const mockProductName = [
      [
        {
          id: 1,
          name: 'Cerveja',
          quantity: 6,
        }
      ]
    ]

    beforeEach(async () => {
      sinon.stub(connection, 'execute').resolves(mockProductName);
    });

    afterEach(async () => {
      connection.execute.restore();
    });

    it('retorna um array quando o nome do produto existe no DB', async () => {
      const response = await productModel.nameAlreadyExists('Cerveja');

      expect(response).to.be.an('array');
    });

    it('O objeto retornado dentro do array contém as chaves "id", "name", "quantity"', async () => {
      const [response] = await productModel.nameAlreadyExists('Cerveja');

      expect(response).to.contain.all.keys('id', 'name', 'quantity');
    });
  });

  describe('Quando o "nome informado não existe"', () => {

    beforeEach(async () => {
      sinon.stub(connection, 'execute').resolves([[]]);
    });

    afterEach(async () => {
      connection.execute.restore();
    });

    it('retorna null quando não acha um produto com o ID informado', async () => {
      const response = await productModel.nameAlreadyExists('Miojo');

      expect(response).to.be.null;
    });
  });
});

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