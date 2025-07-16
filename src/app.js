import 'dotenv/config';
import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import cookieParser from 'cookie-parser';
import passport from 'passport';

import __dirname from './utils/constantsUtil.js';
import { connectDB } from './config/db.js';
import websocket from '../websocket.js';

import productRouter from './routes/productRouter.js';
import cartRouter from './routes/cartRouter.js';
import sessionRouter from './routes/sessions.router.js';
import userRouter from './routes/userRouter.js';
import viewsRouter from './routes/viewsRouter.js';

import './config/passport/passport-local.js';
import './config/passport/passport-jwt.js';

const app = express();

connectDB();

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/../views`);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());
app.use(passport.initialize());

app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/api/sessions', sessionRouter);
app.use('/api/users', userRouter);
app.use('/', viewsRouter);

const PORT = process.env.PORT || 8080;
const httpServer = app.listen(PORT, () => {
  console.log(`🪑 Muebles Backend corriendo en http://localhost:${PORT}`);
});

const io = new Server(httpServer);
websocket(io);
