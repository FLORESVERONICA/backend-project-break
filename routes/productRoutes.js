const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', productController.showHome);
router.get('/products', productController.showProducts);
router.get('/products/:productId', productController.showProductById);
router.get('/dashboard', productController.showDashboardProducts);
router.get('/dashboard/new', productController.showNewProduct);
router.post('/dashboard', productController.createProduct);
router.get('/dashboard/:productId/edit', productController.showEditProduct);
router.post('/dashboard/:productId', productController.updateProduct);
router.post('/dashboard/:productId/delete', productController.deleteProduct);
router.get('/dashboard', authMiddleware, productController.showDashboardProducts);
router.get('/dashboard/new', authMiddleware, productController.showNewProduct);
router.post('/dashboard', authMiddleware, productController.createProduct);
router.get('/dashboard/:productId/edit', authMiddleware, productController.showEditProduct);
router.post('/dashboard/:productId', authMiddleware, productController.updateProduct);
router.post('/dashboard/:productId/delete', authMiddleware, productController.deleteProduct);


module.exports = router;
