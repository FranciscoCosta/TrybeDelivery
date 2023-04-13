const express = require('express');
const {
  productsAllController,
  productsIdController,
  addPoroductController,
  deleteproductController,
} = require('../controllers/ProductsController');

const productsRoute = express.Router();

productsRoute.post('/products', (req, res) => addPoroductController(req, res));
productsRoute.delete('/products/:id', (req, res) => deleteproductController(req, res));
productsRoute.get('/products', (req, res) => productsAllController(req, res));
productsRoute.get('/products/:id', (req, res) =>
  productsIdController(req, res));

module.exports = productsRoute;
