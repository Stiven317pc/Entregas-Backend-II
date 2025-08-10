import { Router } from 'express';
import ProductModel from '../models/Product.js';
import { authenticateJWT } from '../middlewares/authenticateJWT.js';

const router = Router();

router.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

router.get('/', (req, res) => {
  res.render('home');
});

router.get('/products', authenticateJWT, async (req, res) => {
  try {
    const products = await ProductModel.find().lean();
    const userCartId = req.user?.cart;

    res.render('index', {
      products,
      userCartId,
      user: req.user
    });
  } catch (err) {
    console.error('❌ Error al obtener productos:', err);
    res.status(500).send('Error interno al cargar productos');
  }
});

export default router;
