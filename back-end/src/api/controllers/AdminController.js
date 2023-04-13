const {
  adminUsersService,
  adminSellersService,
  adminSalesService,
  adminProductsService,
  adminSellersPriceService,
  adminSellersQuantityService,
} = require('../services/AdminService');

const AdminUsers = async (_req, res) => {
  const users = await adminUsersService();
  if (!users) return res.status(404).json({ message: 'Users not found' });
  return res.status(200).json(users);
};

const AdminSellers = async (_req, res) => {
  const sellers = await adminSellersService();
  if (!sellers) return res.status(404).json({ message: 'Sellers q12312 not found' });
  return res.status(200).json(sellers);
};

const AdminProducts = async (_req, res) => {
  const products = await adminProductsService();
  if (!products) return res.status(404).json({ message: 'Products not found' });
  return res.status(200).json(products);
};

const AdminSales = async (_req, res) => {
  const sales = await adminSalesService();
  if (!sales) return res.status(404).json({ message: 'Sales not found' });
  return res.status(200).json(sales);
};

const AdminSellersPrice = async (_req, res) => {
  const SellersByPrice = await adminSellersPriceService();
  if (!SellersByPrice) { return res.status(404).json({ message: 'Sellers not found' }); }
  return res.status(200).json(SellersByPrice);
};

const AdminSellersQuantity = async (_req, res) => {
  const SellersByQuantity = await adminSellersQuantityService();
  if (!SellersByQuantity) { return res.status(404).json({ message: 'Sellers not found' }); }
  return res.status(200).json(SellersByQuantity);
};

module.exports = {
  AdminUsers,
  AdminSellers,
  AdminProducts,
  AdminSales,
  AdminSellersPrice,
  AdminSellersQuantity,
};
