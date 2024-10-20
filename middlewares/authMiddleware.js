
const { firebaseAdmin } = require('../config/firebase');

const authMiddleware = async (req, res, next) => {
    
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.redirect('/auth/login'); 
    }

    try {
        
        const decodedUser = await firebaseAdmin.auth().verifyIdToken(token);
        req.user = decodedUser; 
        next(); 
    } catch (error) {
        console.error('Error al verificar el token:', error);
        return res.redirect('/auth/login'); 
    }
};

module.exports = authMiddleware;

