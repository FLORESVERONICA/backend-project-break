const Product = require('../models/Product');

const showHome = (req, res) => {
  const html = baseHtml('Bienvenido a la tienda d_4hojas', getNavBar(false) + `
    <h1>Bienvenido a la tienda d_4hojas</h1>
    <p>Aquí encontrarás nuestros productos organizados por categorías.</p>
  `);
  res.send(html);
};

const showProducts = async (req, res) => {
  try {
    const category = req.query.category;
    let products;

    if (category) {
      products = await Product.find({ category });
    } else {
      products = await Product.find();
    }

    const productCards = getProductCards(products, false);
    const html = baseHtml('Todos los Productos', getNavBar(false) + productCards);
    res.send(html);
  } catch (err) {
    res.status(500).send('Error al obtener productos');
  }
};

const showProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    const html = baseHtml(product.name, getNavBar(false) + getProductDetail(product));
    res.send(html);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
};

const showDashboardProducts = async (req, res) => {
  try {
    const products = await Product.find();
    const productCards = getProductCards(products, true);
    const html = baseHtml('Dashboard', getNavBar(true) + productCards);
    res.send(html);
  } catch (err) {
    res.status(500).send('Error al obtener productos para el dashboard');
  }
};

const showNewProduct = (req, res) => {
  const html = baseHtml('Crear Nuevo Producto', getNavBar(true) + getProductForm());
  res.send(html);
};

const createProduct = async (req, res) => {
  try {
    const { name, description, image, category, size, price } = req.body;

    if (!name || !description || !image || !category || !size || price === undefined) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const product = new Product({ name, description, image, category, size, price });
    await product.save();
    res.status(201).json({ message: 'Producto creado con éxito', product });
  } catch (err) {
    console.error(`Error al crear producto: ${err.message}`);
    res.status(500).json({ error: 'Error al crear el producto' }); 
  }
};

const showEditProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).send('Producto no encontrado');
    }
    const html = baseHtml('Editar Producto', getNavBar(true) + getProductForm(product));
    res.send(html);
  } catch (err) {
    res.status(500).send('Error al obtener el producto');
  }
};

const updateProduct = async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.productId, req.body);
    res.redirect('/dashboard');
  } catch (err) {
    res.status(500).send('Error al actualizar el producto');
  }
};

const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.productId);
    res.redirect('/dashboard');
  } catch (err) {
    res.status(500).send('Error al eliminar el producto');
  }
};

function baseHtml(title, content) {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>${title}</title>
      <link rel="stylesheet" href="/styles.css">
    </head>
    <body>
      ${content}
    </body>
    </html>
  `;
}

function getNavBar(isDashboard = false) {
  let navLinks = `
    <a href="/products">Todos los productos</a>
    <a href="/products?category=Tazas">Tazas</a>
    <a href="/products?category=Botellas">Botellas</a>
    <a href="/products?category=Llaveros">Llaveros</a>
    <a href="/products?category=Camisetas">Camisetas</a>
    <a href="/products?category=Lozas">Lozas</a>
    <a href="/auth/login">Iniciar Sesión</a> <!-- Enlace al login -->
    <a href="/auth/register">Registrarse</a> <!-- Enlace al registro -->
  `;

  if (isDashboard) {
    navLinks += `
      <a href="/dashboard">Dashboard</a>
      <a href="/dashboard/new">Crear Nuevo Producto</a>
    `;
  }

  return `<nav class="navbar"><ul><li><a href="/">Inicio</a></li>${navLinks}</ul></nav>`;
}

function getProductCards(products, isDashboard = false) {
  let html = '';
  for (let product of products) {
    html += `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}">
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <p>${product.price}€</p>
        ${isDashboard ? `
          <a href="/dashboard/${product._id}">Ver Detalle</a>
          <a href="/dashboard/${product._id}/edit">Editar</a>
          <form action="/dashboard/${product._id}/delete" method="POST" onsubmit="return confirm('¿Seguro que deseas eliminar este producto?');">
            <button type="submit">Eliminar</button>
          </form>
        ` : `<a href="/products/${product._id}">Ver detalle</a>`}
      </div>
    `;
  }
  return html;
}

function getProductDetail(product) {
  return `
    <div class="product-detail">
      <img src="${product.image}" alt="${product.name}">
      <h2>${product.name}</h2>
      <p>${product.description}</p>
      <p>${product.price}€</p>
    </div>
  `;
}

function getProductForm(product = {}) {
  return `
    <form action="${product._id ? `/dashboard/${product._id}` : '/dashboard'}" method="POST">
      <label>Nombre:
        <input type="text" name="name" value="${product.name || ''}" required>
      </label>
      <label>Descripción:
        <textarea name="description" required>${product.description || ''}</textarea>
      </label>
      <label>Imagen (URL):
        <input type="text" name="image" value="${product.image || ''}" required>
      </label>
      <label>Categoría:
        <select name="category" required>
          ${['Tazas', 'Llaveros', 'Botellas', 'Camisetas', 'Lozas'].map(category => `
            <option value="${category}" ${product.category === category ? 'selected' : ''}>${category}</option>
          `).join('')}
        </select>
      </label>
      <label>Talla:
        <select name="size" required>
          ${['XS', 'S', 'M', 'L', 'XL'].map(size => `
            <option value="${size}" ${product.size === size ? 'selected' : ''}>${size}</option>
          `).join('')}
        </select>
      </label>
      <label>Precio:
        <input type="number" name="price" value="${product.price || ''}" step="0.01" required>
      </label>
      <button type="submit">${product._id ? 'Actualizar Producto' : 'Crear Producto'}</button>
    </form>
  `;
}

module.exports = {
  showHome,
  showProducts,
  showProductById,
  showDashboardProducts,
  showNewProduct,
  createProduct,
  showEditProduct,
  updateProduct,
  deleteProduct
};
