PROYECTO TIENDA "D_4HOJAS"
Este proyecto es ua web de una tienda llamade d_4hojas con productos personalizados. la web permite al usuario navergar por productos por categorias y ver los detalles de cada uno. los administradores pueden gestionar el producto a través de un dashboard para poder crear, editar o eliminar el producto.

Indice
1. descripción
2. Requisitos Previos
3. instalación
4. Estructura
5. Flujo de trabajo
6. Rutas
7. Pruebas
8. Despliegue
9. bonus 

1. Descripción
El proyecto está constituido usando Node.js con Express para manejar rutas y pas operaciones CRUD, MongoDB para la base de datos donde se alamacenan los productos, y HTML/CSS para la vista dinámica.Los Productos se pueden gestionar a través de un dashboard que incluye opciones para crear, actualizar, ver y eliminiar productos.

2. Requisiros previos
Necesitamos tener los siguientes requisitos antes de comenzar:
- Node.js
- MongoDB
- Git

3. Instalación
- Clonar Repositrio desde Git: git clone: https://github.com/FLORESVERONICA/backend-project-break.git
- instalar dependencias: npm install -y
- crear archivo .env: PORT = 8080, MONGO_URI=(enlace base de datos)
- iniciar servidor: npm start
- El proyecto esta disponible en http://localhost:8080

4. ESTRUCTURA:

|d_4hojas/
│
├── controllers/         ( Controladores que manejan la lógica de productos y la página de inicio)
│   ├── productController.js
│   └── homeController.js
├── models/              (Modelos de datos (MongoDB))
│   └── Product.js
├── public/              (Archivos estáticos CSS e imágenes)
│   └── styles.css
├── routes/              (Rutas)
│   └── productRoutes.js
├── .env                 (Variables de entorno (añadir enlace MongoDB))
├── index.js             (Archivo creacion del servidor)
├── package.json         ( Archivo de configuración de dependencias)
└── README.MD        (Documentación del proyecto)

5. FLUJO DEL TRABAJO
Para el desarrollo del proyecto he seguido los siguientes pasos:
 1º. inicialización del proyecto: intale npm init -y para iniciar, configuré Express para el manejo de rutas y conecté MongoDB von Mongoose.
 2º. Modelo de Producto: Creé un modelo Product.js en la carpeta models/ para definir el esquema de los productos.
 3º Rutas y controladores: Configuración de rutas en productRoutes.js y conecté esas rutas a los controladores en productController.js., las rutas incluyen operaciones CRUD para los productos como la Home y el dashboard.
 4º Diseño: use HTML y CSS para crear la ectructura
 5º Dasboard: Cree un panel donde el administrador puede gestionar los productos(crear, modificar y eliminar)

 6. Rutas del Proyecto
  Página de Inicio (GET /): Muestra un mensaje de bienvenida y un menú con las categorías de productos.
Productos:
GET /products: Muestra todos los productos.
GET /products/:productId: Muestra el detalle de un producto específico.
GET /products?category=Categoría: Filtra los productos por categoría.
Dashboard (Administrador):
GET /dashboard: Muestra todos los productos con opciones para gestionarlos.
GET /dashboard/new: Muestra el formulario para crear un nuevo producto.
POST /dashboard: Crea un nuevo producto.
GET /dashboard/:productId/edit: Muestra el formulario para editar un producto existente.
POST /dashboard/:productId: Actualiza un producto existente.

7. Pruebas.
a traves de Postman realice las pruebas pertinentes para ver que todos los controladores y rutas funcionan correctamente tanto los post como los get, ademas desde loscalhost:8080 accedi a todas las rutas para comprobar que funcionaba correctamente.
8. Despliegue
- configuracion de Render: cree un nuevo proyecto en render y vinculé el repositorio de GitHub donde se encuentra el project.
- Añadi las variables de entorno, confihure las variables necesarias como Mongo _URi y las Claves de Firebase, asegurandome de que el proyecto funcionara correctamente en el entrono de producción.
-Despliegue automatico: cada vex que realizo un push en la rama principal de mi repositorio, render se encarga de desplegar automáticamente la ultima versión del proyecto, asegurnado que siempre esté actualizado.
BONUS
Añado los siguientes documentos:
- Dentro de la carpeta config añado los documentos: firebase.js, firebaseClient.js y serviceAccountKey.json
- Dento de la carpeta controller: authContoller.js y apiController.js
- Dentro de la carpeta middlewares: authMiddleware.js
- Dentro de la carpeta routes: apiRoutes.js y authRoutes.js
- Dentro de la carpeta test: productController.test.js
- añado tambien un documento de Swagger.js
9. BONUS
BONUS 1 - Test
- instalo jest y supertest con npm install --save-dev jest supertest.
- en productContoller.test.js creo las pruebas para los metodos de los controladores de productos, verificando que las respuestas son correctas y que las operaciones CRUD funcionan
BONUS 2 - Autenticación con firebase
- Istalacion de firebase : npm install firebase firebase-admin
- en firebase.js inicialicé firebase Admin utilizando el archivo serviceAccountKey.json y configure la autenticación con firebase
- en authController.js, implementé la logica para el registro y login de usuarios
- En routes/authRoutes.js rutas para manejar solicitudes de autenticación
- en firebaseClient.js auntenticación del lado del cliente

BONUS - 3 API y documentación con Swagger
 - instalación de Swagge: 
 npm install swagger-jsdoc swagger-ui-express
 - Configuracion de Swagger en Swagger.js aqui esta la informacion básica de la API
 - en apiRoutes.js estan las rutas de la API para el controlador que está en apiController.js para manejar solicitudes, las rutas incluyen endpoints para obtener, crear, actualizar y eliminar productos.
 - en el archivo index.js, integrá Swagger con Express para que la documentacion esté disponible en localhost:8080/api-docs.
 ESTE ES EL ENCALE DE RENDER: https://backend-project-break-ty9s.onrender.com