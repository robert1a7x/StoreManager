const express = require('express');
const bodyParser = require('body-parser');
const productController = require('./controllers/productController');
const errorMiddleware = require('./middlewares/errorMiddleware');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', productController.create);
app.get('/products', productController.getAll);
app.get('/products/:id', productController.getById);
app.put('/products/:id', productController.update);
app.delete('/products/:id', productController.remove);

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
