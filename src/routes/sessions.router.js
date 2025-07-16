import { Router } from 'express';
import passport from 'passport';
import { generateToken } from '../utils/jwt.js';
import { auth } from '../middlewares/auth.js';

const router = Router();

router.post('/register', passport.authenticate('register', { session: false }), (req, res) => {
  res.status(201).json({ message: 'Usuario registrado correctamente' });
});

router.post('/login', passport.authenticate('login', { session: false }), (req, res) => {
  const token = generateToken(req.user);
  res.cookie('jwt', token, { httpOnly: true }).json({ message: 'Login exitoso', token });
});

router.get('/current', auth, (req, res) => {
  res.json({ status: 'success', user: req.user });
});

router.get('/logout', (req, res) => {
  res.clearCookie('jwt');
  res.json({ status: 'success', message: 'Sesión cerrada correctamente' });
});

export default router;
