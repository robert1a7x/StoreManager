const express = require('express');
const bodyParser = require('body-parser');
const productController = require('./controllers/productController');
const salesController = require('./controllers/salesController');
const errorMiddleware = require('./middlewares/errorMiddleware');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());

app.post('/products', productController.create);
app.get('/products', productController.getAll);
app.get('/products/:id', productController.getById);
app.put('/products/:id', productController.update);
app.delete('/products/:id', productController.remove);

app.post('/sales', salesController.create);
app.get('/sales', salesController.getAll);
app.get('/sales/:id', salesController.getById);
app.put('/sales/:id', salesController.update);
app.delete('/sales/:id', salesController.destroy);

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
