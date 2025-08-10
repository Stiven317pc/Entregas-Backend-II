import { Router } from 'express';
import passport from 'passport';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/products.controller.js';
import { authorizeRoles } from '../middlewares/role.middleware.js';

const router = Router();

router.get('/', getProducts);
router.get('/:pid', getProductById);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  authorizeRoles('admin', 'premium'),
  createProduct
);

router.put(
  '/:pid',
  passport.authenticate('jwt', { session: false }),
  authorizeRoles('admin', 'premium'),
  updateProduct
);

router.delete(
  '/:pid',
  passport.authenticate('jwt', { session: false }),
  authorizeRoles('admin'),
  deleteProduct
);

export default router;
