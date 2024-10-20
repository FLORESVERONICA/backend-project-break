const Product = require('../models/Product');

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         name:
 *           type: string
 *           example: "Taza de Cerámica"
 *         description:
 *           type: string
 *           example: "Taza de cerámica blanca con diseño colorido."
 *         image:
 *           type: string
 *           example: "https://example.com/image.jpg"
 *         category:
 *           type: string
 *           example: "Tazas"
 *         size:
 *           type: string
 *           example: "M"
 *         price:
 *           type: number
 *           format: float
 *           example: 12.99
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Obtiene la lista de productos
 *     responses:
 *       200:
 *         description: Lista de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
};

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Obtiene un producto por ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del producto a obtener
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Producto no encontrado
 */
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
};

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Crea un nuevo producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Producto creado con éxito
 *       400:
 *         description: Error de validación
 */
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

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Actualiza un producto existente
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del producto a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Producto actualizado
 *       404:
 *         description: Producto no encontrado
 */
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.status(200).json({ message: 'Producto actualizado', product });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
};

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Elimina un producto existente
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del producto a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Producto eliminado
 *       404:
 *         description: Producto no encontrado
 */
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
