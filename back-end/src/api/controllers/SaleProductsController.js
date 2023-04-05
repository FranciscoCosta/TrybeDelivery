const { getSaleProductService,
    getAllSalePService,
     createSaleProductsService } = require('../services/SaleProductsService');

const getSaleProductsController = async (req, res) => {
        const salesProducts = await getSaleProductService(req);
        if (!salesProducts) return res.status(404).json({ message: 'No sales' });
        return res.status(200).json(salesProducts);
    };

const createSaleProductsController = async (req, res) => {
        const saleProducts = await createSaleProductsService(req.body);
        if (!saleProducts) return res.status(400).json({ message: 'No sale' });
        return res.status(201).json(saleProducts);
    };

    const getAllSalesPController = async (_req, res) => {
        console.log('Controller');
        const salesProducts = await getAllSalePService();
        if (!salesProducts) return res.status(404).json({ message: 'No sales' });
        return res.status(200).json(salesProducts);
    };

module.exports = { getSaleProductsController, 
    createSaleProductsController,
getAllSalesPController };