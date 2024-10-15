const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Ruta para la página principal (Home)
router.get('/', productController.showHome);

// Rutas para los productos
router.get('/products', productController.showProducts);
router.get('/products/:productId', productController.showProductById);

// Rutas para el dashboard
router.get('/dashboard', productController.showDashboardProducts);
router.get('/dashboard/new', productController.showNewProduct);
router.post('/dashboard', productController.createProduct);
router.get('/dashboard/:productId/edit', productController.showEditProduct);
router.post('/dashboard/:productId', productController.updateProduct);
router.post('/dashboard/:productId/delete', productController.deleteProduct);

module.exports = router;
