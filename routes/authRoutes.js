const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); 


router.get('/login', authController.login); 


router.post('/login', authController.loginUser); 


router.get('/register', authController.register); 


router.post('/register', authController.registerUser); 

module.exports = router;


