const express = require('express');
const {
  AdminUsers,
  AdminSellers,
  AdminProducts,
  AdminSales,
  AdminSellersPrice,
  AdminSellersQuantity,
} = require('../controllers/AdminController');

const adminRoute = express.Router();

adminRoute.get('/admin/users', (req, res) => AdminUsers(req, res));
adminRoute.get('/admin/sellers', (req, res) => AdminSellers(req, res));
adminRoute.get('/admin/products', (req, res) => AdminProducts(req, res));
adminRoute.get('/admin/sales', (req, res) => AdminSales(req, res));
adminRoute.get('/admin/sellers/price', (req, res) => AdminSellersPrice(req, res));
adminRoute.get('/admin/sellers/quantity', (req, res) => AdminSellersQuantity(req, res));

module.exports = adminRoute;
