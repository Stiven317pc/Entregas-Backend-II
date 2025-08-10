import express from 'express';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import exphbs from 'express-handlebars';

import { connectDB } from './config/db.js';
import './config/passportStrategies.js';

import productsRoutes from './routes/products.routes.js';
import cartsRoutes from './routes/carts.routes.js';
import ticketsRoutes from './routes/tickets.routes.js';
import sessionsRouter from './routes/sessions.routes.js';
import passwordResetRoutes from './routes/passwordReset.routes.js';
import viewsRouter from './routes/views.routes.js';

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const hbs = exphbs.create({
  extname: '.handlebars',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  partialsDir: path.join(__dirname, 'views', 'partials'),
  helpers: {
    ifEquals: function (a, b, options) {
      return a === b ? options.fn(this) : options.inverse(this);
    }
  }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(passport.initialize());

app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

app.use('/api/sessions', sessionsRouter);
app.use('/api/password', passwordResetRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/carts', cartsRoutes);
app.use('/api/tickets', ticketsRoutes);

app.use('/', viewsRouter);
app.use('/sessions', sessionsRouter);

app.use((req, res, next) => {
  console.log('🍪 JWT en cookie:', req.cookies?.jwt);
  next();
});

app.use((req, res) => {
  res.status(404).render('notFound', { message: 'Página no encontrada 😢' });
});

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
});
