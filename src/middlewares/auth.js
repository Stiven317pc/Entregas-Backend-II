import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export function auth(req, res, next) {
  const token = req.cookies?.jwt;

  if (!token) {
    return res.status(401).send({ status: 'error', message: 'No estás autenticado. Token faltante.' });
  }

  try {
    const user = jwt.verify(token, JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    res.status(403).send({ status: 'error', message: 'Token inválido.' });
  }
}
