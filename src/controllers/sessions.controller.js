import AuthService from '../services/auth.service.js';
import CurrentUserDTO from '../dtos/CurrentUserDTO.js';
import CartService from '../services/cart.service.js';

const authService = new AuthService();
const cartService = new CartService();

export const registerController = async (req, res) => {
  try {
    const cart = await cartService.createCart();
    req.user.cart = cart._id;
    await req.user.save();

    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error('❌ Error en registerController:', error);
    res.status(500).json({ error: 'Error en el registro' });
  }
};

export const loginController = (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = authService.generateToken(user);

    res
      .cookie('jwt', token, {
        httpOnly: true,
        secure: false, 
        maxAge: 60 * 60 * 1000,
      })
      .json({ message: '✅ Login exitoso', token });
  } catch (error) {
    console.error('❌ Error en loginController:', error);
    res.status(500).json({ error: 'Error en el login' });
  }
};


export const currentController = (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Usuario no autenticado' });
    }

    const userDTO = new CurrentUserDTO(req.user);
    res.json({ status: 'success', payload: userDTO });
  } catch (error) {
    console.error('❌ Error en currentController:', error);
    res.status(500).json({ error: 'Error al obtener el usuario actual' });
  }
};

export const logoutController = (req, res) => {
  res.clearCookie('jwt').json({ message: '👋 Sesión cerrada correctamente' });
};
