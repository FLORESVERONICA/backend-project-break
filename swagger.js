const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.3',
    info: {
      title: 'API de Tienda d_4hojas',
      version: '1.0.0',
      description: 'Documentación de la API de Tienda d_4hojas',
    },
    servers: [
      {
        url: 'http://localhost:8080/api',
      },
    ],
  },
  apis: ['./routes/apiRoutes.js', './controllers/apiController.js'], 
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerUi, swaggerDocs };
