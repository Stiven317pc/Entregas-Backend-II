import { Router } from 'express';
import {
  createCart,
  getCart,
  addProductToCart,
  removeProductFromCart,
  clearCart,
} from '../controllers/carts.controller.js';
import { authorizeRoles } from '../middlewares/role.middleware.js';
import { authenticateJWT } from '../middlewares/authenticateJWT.js';

const router = Router();

router.post('/', authenticateJWT, authorizeRoles('user'), createCart);

router.get('/:cid', authenticateJWT, getCart);

router.post('/:cid/product/:pid', authenticateJWT, authorizeRoles('user'), addProductToCart);

router.delete('/:cid/product/:pid', authenticateJWT, authorizeRoles('user'), removeProductFromCart);

router.delete('/:cid', authenticateJWT, authorizeRoles('user'), clearCart);

export default router;
