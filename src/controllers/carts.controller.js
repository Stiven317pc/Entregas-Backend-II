import CartService from '../services/cart.service.js';

const cartService = new CartService();

export const createCart = async (req, res) => {
  const cart = await cartService.createCart();
  res.status(201).json(cart);
};

export const getCart = async (req, res) => {
  const cart = await cartService.getCart(req.params.cid);
  if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });
  res.json(cart);
};

export const addProductToCart = async (req, res) => {
  const { pid } = req.params;
  const { quantity } = req.body;
  const updatedCart = await cartService.addProduct(req.params.cid, pid, quantity);
  res.json(updatedCart);
};

export const removeProductFromCart = async (req, res) => {
  const updatedCart = await cartService.removeProduct(req.params.cid, req.params.pid);
  res.json(updatedCart);
};

export const clearCart = async (req, res) => {
  const cleared = await cartService.clearCart(req.params.cid);
  res.json(cleared);
};
