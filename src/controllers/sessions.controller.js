import { generateToken } from '../utils/jwt.js';

export const registerController = (req, res) => {
  if (!req.user) {
    return res.status(400).send({
      status: 'error',
      message: '❌ Registro fallido',
    });
  }

  res.status(201).send({
    status: 'success',
    message: '✅ Registro exitoso',
    user: req.user,
  });
};

export const loginController = (req, res) => {
  if (!req.user) {
    return res.status(401).send({
      status: 'error',
      message: '❌ Login inválido',
    });
  }

  const token = generateToken(req.user);

  res.cookie('jwt', token, {
    httpOnly: true,
    maxAge: 60 * 60 * 1000, 
  });

  res.send({
    status: 'success',
    message: '🔐 Login exitoso',
    token,
  });
};

export const currentController = (req, res) => {
  if (!req.user) {
    return res.status(401).send({
      status: 'error',
      message: '❌ Token inválido o usuario no autenticado',
    });
  }

  res.send({
    status: 'success',
    message: '👤 Usuario actual válido',
    user: req.user,
  });
};
