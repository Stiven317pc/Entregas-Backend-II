import { Router } from 'express';
import passport from 'passport';
import {
  registerController,
  loginController,
  logoutController,
} from '../controllers/sessions.controller.js';
import CurrentUserDTO from '../dtos/CurrentUserDTO.js';

const router = Router();

router.post('/register', passport.authenticate('register', { session: false }), registerController);
router.post('/login', passport.authenticate('login', { session: false }), loginController);
router.post('/logout', logoutController);

router.get('/login', (req, res) => res.render('login'));
router.get('/register', (req, res) => res.render('register'));
router.get('/recover', (req, res) => res.render('recover'));

router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const userDTO = new CurrentUserDTO(req.user);
    res.json({ status: 'success', payload: userDTO });
  }
);

export default router;
