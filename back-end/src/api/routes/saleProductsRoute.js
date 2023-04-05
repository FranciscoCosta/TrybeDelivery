const express = require('express');
const { getSaleProductsController,
    getAllSalesPController,
createSaleProductsController } = require('../controllers/SaleProductsController');

const saleProductsRoute = express.Router();

saleProductsRoute.post('/saleproducts', (req, res) => getSaleProductsController(req, res));
saleProductsRoute.post('/products/sales', (req, res) => createSaleProductsController(req, res));
saleProductsRoute.get('/mostsold', (req, res) => getAllSalesPController(req, res));
module.exports = saleProductsRoute;