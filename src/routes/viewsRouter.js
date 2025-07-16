import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { productDBManager } from '../dao/productDBManager.js';
import { cartDBManager } from '../dao/cartDBManager.js';

const router = Router();
const ProductService = new productDBManager();
const CartService = new cartDBManager(ProductService);
const JWT_SECRET = process.env.JWT_SECRET;

router.get('/', (req, res) => {
  const token = req.cookies?.jwt;
  let user = null;

  if (token) {
    try {
      user = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      user = null;
    }
  }

  res.render('home', {
    title: 'Inicio',
    style: 'index.css',
    user
  });
});

router.get('/products', async (req, res) => {
  const products = await ProductService.getAllProducts(req.query);

  res.render('index', {
    title: 'Productos',
    style: 'index.css',
    products: JSON.parse(JSON.stringify(products.docs)),
    prevLink: {
      exist: products.prevLink ? true : false,
      link: products.prevLink
    },
    nextLink: {
      exist: products.nextLink ? true : false,
      link: products.nextLink
    }
  });
});

router.get('/realtimeproducts', async (req, res) => {
  const products = await ProductService.getAllProducts(req.query);

  res.render('realTimeProducts', {
    title: 'Productos en tiempo real',
    style: 'index.css',
    products: JSON.parse(JSON.stringify(products.docs))
  });
});

router.get('/cart/:cid', async (req, res) => {
  try {
    const cid = req.params.cid;

    if (!cid || cid === 'undefined' || cid.length !== 24) {
      throw new Error(`❌ ID de carrito inválido: ${cid}`);
    }

    const response = await CartService.getProductsFromCartByID(cid);

    res.render('cart', {
      title: 'Carrito de compras',
      style: 'index.css',
      products: JSON.parse(JSON.stringify(response.products))
    });

  } catch (error) {
    console.error('⛔ Error en /cart/:cid →', error.message);
    res.render('notFound', {
      title: 'Carrito no válido',
      style: 'index.css',
      message: error.message
    });
  }
});

export default router;
