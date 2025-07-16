import { Router } from 'express';
import { cartDBManager } from '../dao/cartDBManager.js';
import { productDBManager } from '../dao/productDBManager.js';

const router = Router();
const ProductService = new productDBManager();
const CartService = new cartDBManager(ProductService);

router.post('/', async (req, res) => {
  try {
    const cart = await CartService.createCart();
    res.status(201).json({ status: 'success', payload: cart });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

router.get('/:cid', async (req, res) => {
  try {
    const cart = await CartService.getProductsFromCartByID(req.params.cid);

    console.log(`🛒 Carrito ${cart._id} tiene ${cart.products.length} productos`);

    res.status(200).json({ status: 'success', payload: cart });
  } catch (error) {
    res.status(404).json({ status: 'error', message: error.message });
  }
});

router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const cart = await CartService.addProductByID(req.params.cid, req.params.pid);
    res.status(200).json({ status: 'success', payload: cart });
  } catch (error) {
    res.status(404).json({ status: 'error', message: error.message });
  }
});

router.delete('/:cid/product/:pid', async (req, res) => {
  try {
    const cart = await CartService.deleteProductByID(req.params.cid, req.params.pid);
    res.status(200).json({ status: 'success', payload: cart });
  } catch (error) {
    res.status(404).json({ status: 'error', message: error.message });
  }
});

router.put('/:cid', async (req, res) => {
  try {
    const cart = await CartService.updateAllProducts(req.params.cid, req.body);
    res.status(200).json({ status: 'success', payload: cart });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
});

router.put('/:cid/product/:pid', async (req, res) => {
  try {
    const cart = await CartService.updateProductByID(req.params.cid, req.params.pid, req.body.quantity);
    res.status(200).json({ status: 'success', payload: cart });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
});

router.delete('/:cid', async (req, res) => {
  try {
    const cart = await CartService.deleteAllProducts(req.params.cid);
    res.status(200).json({ status: 'success', payload: cart });
  } catch (error) {
    res.status(404).json({ status: 'error', message: error.message });
  }
});

export default router;
