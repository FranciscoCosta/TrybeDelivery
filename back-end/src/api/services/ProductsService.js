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

const productsAddService = async (req, _res) => {
    console.log('productsCreateService');
    try {
  const {
    name, price, urlImage, description, volume, alcoholContent, idealTemperature, style,
} = req.body;
  const newProduct = await Product.create({ name,
    price,   
    urlImage,
    description,
    volume,
    alcoholContent,
    idealTemperature,
    style,
  });
  return newProduct;
    } catch (error) {
    return error;
    }
};

const productDeleteService = async (id) => {
  const product = await Product.destroy({ where: { id } });
  return product;
};

module.exports = { productsAllService, productIdService, productsAddService, productDeleteService };
