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

    before(async () => {
      const execute = [{ insertId: 1 }];

      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async () => {
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

    before(async () => {
      sinon.stub(connection, 'execute').resolves(getAllMock);
    });

    after(async () => {
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

    before(async () => {
      sinon.stub(connection, 'execute').resolves(mockProductById);
    });

    after(async () => {
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

    before(async () => {
      sinon.stub(connection, 'execute').resolves([[]]);
    });

    after(async () => {
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

    before(async () => {
      sinon.stub(connection, 'execute').resolves(mockProductUpdate);
    });

    after(async () => {
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

    before(async () => {
      sinon.stub(connection, 'execute').resolves(mockProductRemove);
    });

    after(async () => {
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

    before(async () => {
      sinon.stub(connection, 'execute').resolves(mockProductName);
    });

    after(async () => {
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

    before(async () => {
      sinon.stub(connection, 'execute').resolves([[]]);
    });

    after(async () => {
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

    before(async () => {
      sinon.stub(connection, 'execute').resolves(getAllSalesMock);
    });

    after(async () => {
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

    before(async () => {
      sinon.stub(connection, 'execute').resolves(getAllSalesMock);
    });

    after(async () => {
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

    before(async () => {
      sinon.stub(connection, 'execute').resolves([[]]);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('retorna null quando não acha uma venda com o ID informado', async () => {
      const response = await salesModel.getById(NUMBER_NINE);

      expect(response).to.be.null;
    });
  });
});