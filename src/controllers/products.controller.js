import ProductService from '../services/product.service.js';

const productService = new ProductService();

export const getProducts = async (req, res) => {
  const products = await productService.getProducts();
  res.json(products);
};

export const getProductById = async (req, res) => {
  const product = await productService.getProduct(req.params.pid);
  if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
  res.json(product);
};

export const createProduct = async (req, res) => {
  const newProduct = await productService.createProduct(req.body);
  res.status(201).json(newProduct);
};

export const updateProduct = async (req, res) => {
  const updated = await productService.updateProduct(req.params.pid, req.body);
  res.json(updated);
};

export const deleteProduct = async (req, res) => {
  await productService.deleteProduct(req.params.pid);
  res.json({ message: 'Producto eliminado' });
};
