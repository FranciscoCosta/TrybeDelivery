/* eslint-disable max-len */
const { User } = require('../../database/models');
const { Product } = require('../../database/models/index');
const { Sale } = require('../../database/models/index');

const adminUsersService = async () => {
    const count = await User.count({ where: { role: 'customer' } });
    return count;
};

const adminSellersService = async () => {
    const count = await User.count({ where: { role: 'seller' } });
    return count;
};

const adminProductsService = async () => {
    const count = await Product.count();
    return count;
};

const adminSalesService = async () => {
    const count = await Sale.count();
    return count;
};

const adminSellersPriceService = async () => {
    const sellers = await User.findAll({ where: { role: 'seller' } });
    const sales = await Sale.findAll();
    const sellersWithSales = sellers.map((seller) => sales.filter((sale) => sale.dataValues.sellerId === seller.dataValues.id));
    const sellersTotal = sellersWithSales.map((seller) => 
    seller.reduce((acc, sale) => acc + Number(sale.totalPrice), 0));
    const sellersWithTotal = sellers.map((seller, index) => ({ ...seller.dataValues, total: (sellersTotal[index]).toFixed(2) }));
    const sellersSorted = sellersWithTotal.sort((a, b) => b.total - a.total);
    return sellersSorted;
};

const adminSellersQuantityService = async () => 0;

module.exports = {
  adminUsersService,
  adminSellersService,
  adminSalesService,
  adminProductsService,
  adminSellersPriceService,
  adminSellersQuantityService,
};
