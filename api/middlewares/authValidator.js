import jwt from 'jwt-simple';
import config from '../config/index.js';

export default async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        message: 'No authorization'
      });
    }

    const admin = jwt.encode(token, config.token.secret);
    req.admin = admin;
    next()
  } catch (error) {
    return res.status(500).json({
      message: 'Error al validar el token',
      data: error.message
    });
  }
};