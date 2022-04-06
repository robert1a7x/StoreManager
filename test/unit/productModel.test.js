const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../models/connection');
const productModel = require('../../models/productModel');

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

