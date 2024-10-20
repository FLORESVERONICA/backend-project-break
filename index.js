const express = require('express');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const { swaggerUi, swaggerDocs } = require('./swagger');
const apiRoutes = require('./routes/apiRoutes');
const connectDB = require('./config/db');
const firebaseAdmin = require('./config/firebase.js');


require('dotenv').config();

const app = express();
connectDB();


app.use(express.urlencoded({ extended:true}));
app.use(express.static('public'));

app.use('/auth', authRoutes);
 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/api', apiRoutes);
app.use('/', productRoutes);

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`El servidor esta escuachando en http://localhost:${PORT}`);
    console.log(`La documentación de la API está disponible en http://localhost:${PORT}/api-docs`);
});