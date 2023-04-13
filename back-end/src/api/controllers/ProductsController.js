const {
  productsAllService,
  productIdService,
  productsAddService,
  productDeleteService,
} = require('../services/ProductsService');

const productsAllController = async (req, res) => {
  const products = await productsAllService(req, res);
  if (!products) { return res.status(404).json({ message: 'Couldnt get products' }); }
  return res.status(200).json(products);
};

const productsIdController = async (req, res) => {
  const { id } = req.params;
  const product = await productIdService(id);
  if (!product) { return res.status(404).json({ message: 'Couldnt get products' }); }
  return res.status(200).json(product);
};

const addPoroductController = async (req, res) => {
  const product = await productsAddService(req, res);
  // eslint-disable-next-line max-len
  if (!product.erros) { return res.status(404).json({ message: 'Erro ao registar o produto, verifique se o nome já não está registado' }); }
  return res.status(200).json({ message: 'Produto Registado.' });
};

const deleteproductController = async (req, res) => {
  const { id } = req.params;
  const product = await productDeleteService(id);
  if (!product) { return res.status(404).json({ message: 'Couldnt delete products' }); }
  return res.status(200).json(product);
};

module.exports = {
  productsAllController,
  productsIdController,
  addPoroductController,
  deleteproductController,
};
