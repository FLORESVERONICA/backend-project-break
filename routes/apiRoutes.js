
const express = require('express');
const apiController = require('../controllers/apiController');

const router = express.Router();


router.get('/products', apiController.getProducts);
router.get('/products/:id', apiController.getProductById);
router.post('/products', apiController.createProduct);
router.put('/products/:id', apiController.updateProduct);
router.delete('/products/:id', apiController.deleteProduct);

module.exports = router;
