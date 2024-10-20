const Product = require('../models/Product');
const {
  showHome,
  showProducts,
  showProductById,
  showDashboardProducts,
  showNewProduct,
  createProduct,
  showEditProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

jest.mock('../models/Product');

describe('Product Controller', () => {

  let req, res;

  beforeEach(() => {
    req = { params: {}, query: {}, body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
      redirect: jest.fn()
    };
  });

  it('should display the home page', () => {
    showHome(req, res);
    expect(res.send).toHaveBeenCalled();
  });

  
  it('should display all products', async () => {
    const mockProducts = [
      { name: 'Taza', description: 'Taza bonita', price: 10, category: 'Tazas' },
      { name: 'Botella', description: 'Botella de agua', price: 15, category: 'Botellas' }
    ];
    Product.find.mockResolvedValue(mockProducts);

    await showProducts(req, res);
    expect(res.send).toHaveBeenCalled();
    expect(Product.find).toHaveBeenCalled();
  });

  it('should display products by category', async () => {
    req.query.category = 'Tazas';
    const mockProducts = [{ name: 'Taza', description: 'Taza bonita', price: 10, category: 'Tazas' }];
    Product.find.mockResolvedValue(mockProducts);

    await showProducts(req, res);
    expect(res.send).toHaveBeenCalled();
    expect(Product.find).toHaveBeenCalledWith({ category: 'Tazas' });
  });

 
  it('should display a product by ID', async () => {
    req.params.productId = '123';
    const mockProduct = { name: 'Taza', description: 'Taza bonita', price: 10 };
    Product.findById.mockResolvedValue(mockProduct);

    await showProductById(req, res);
    expect(res.send).toHaveBeenCalled();
    expect(Product.findById).toHaveBeenCalledWith('123');
  });

  it('should return 404 if product is not found', async () => {
    req.params.productId = '123';
    Product.findById.mockResolvedValue(null);

    await showProductById(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith('Producto no encontrado');
  });


  it('should display products in the dashboard', async () => {
    const mockProducts = [{ name: 'Taza', description: 'Taza bonita', price: 10 }];
    Product.find.mockResolvedValue(mockProducts);

    await showDashboardProducts(req, res);
    expect(res.send).toHaveBeenCalled();
    expect(Product.find).toHaveBeenCalled();
  });

  it('should display the new product form', () => {
    showNewProduct(req, res);
    expect(res.send).toHaveBeenCalled();
  });

  it('should create a new product', async () => {
    req.body = {
      name: 'Taza',
      description: 'Una bonita taza',
      image: 'image-url',
      category: 'Tazas',
      size: 'M',
      price: 10
    };

    const mockProduct = new Product(req.body);
    mockProduct.save = jest.fn().mockResolvedValue(mockProduct);

    Product.mockImplementation(() => mockProduct);

    await createProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Producto creado con éxito',
      product: mockProduct
    });
  });

  it('should return 400 if required fields are missing', async () => {
    req.body = {
      name: 'Taza'
    
    };

    await createProduct(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Todos los campos son obligatorios' });
  });

  it('should display the edit product form', async () => {
    req.params.productId = '123';
    const mockProduct = { name: 'Taza', description: 'Taza bonita', price: 10 };
    Product.findById.mockResolvedValue(mockProduct);

    await showEditProduct(req, res);
    expect(res.send).toHaveBeenCalled();
    expect(Product.findById).toHaveBeenCalledWith('123');
  });

 
  it('should update a product', async () => {
    req.params.productId = '123';
    req.body = { name: 'Taza actualizada' };

    await updateProduct(req, res);
    expect(Product.findByIdAndUpdate).toHaveBeenCalledWith('123', req.body);
    expect(res.redirect).toHaveBeenCalledWith('/dashboard');
  });

  it('should delete a product', async () => {
    req.params.productId = '123';

    await deleteProduct(req, res);
    expect(Product.findByIdAndDelete).toHaveBeenCalledWith('123');
    expect(res.redirect).toHaveBeenCalledWith('/dashboard');
  });
});
