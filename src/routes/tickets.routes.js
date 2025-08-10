import { Router } from 'express';
import passport from 'passport';
import { purchaseCart } from '../controllers/purchase.controller.js';
import { authorizeRoles } from '../middlewares/role.middleware.js';

const router = Router();

router.post(
  '/purchase',
  passport.authenticate('jwt', { session: false }),
  authorizeRoles('user'), 
  purchaseCart
);

export default router;
