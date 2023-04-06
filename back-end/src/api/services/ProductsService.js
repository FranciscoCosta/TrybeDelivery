const { Product } = require('../../database/models/index');

 const productsAllService = async (_req, _res) => {
    try {
        const allProducts = await Product.findAll();
        console.log(allProducts);
        return allProducts;
    } catch (error) {
        console.log(error);
    }
};

const productIdService = async (id) => {
    const product = await Product.findOne({ where: { id } });
    return product;
};
module.exports = { productsAllService, productIdService };
