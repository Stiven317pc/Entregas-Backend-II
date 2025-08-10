import AuthService from '../services/auth.service.js';

const authService = new AuthService();

export const loginController = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = authService.generateToken(user);
    console.log('🎟️ Token generado:', token);

    res
      .cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 1000 
      })
      .json({ message: '✅ Login exitoso' });
  } catch (error) {
    console.error('❌ Error en loginController:', error);
    res.status(500).json({ message: 'Error interno en login' });
  }
};
