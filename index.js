const express = require('express');
const app = express();
const productRoutes = require('./routes/productRoutes');
const connectDB = require('./config/db');
require('dotenv').config();

connectDB();

//para parsear el body de las peticiones POST
app.use(express.urlencoded({ extended:true}));

app.use(express.static('public'));

app.use('/', productRoutes)




//escucha en el puerto
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`El servidor esta escuachando en http://localhost:${PORT}`);
})