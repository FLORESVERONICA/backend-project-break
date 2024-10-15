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
8. Conclusión

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



