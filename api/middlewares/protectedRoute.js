import jwt from 'jwt-simple';
import config from '../config/index.js';
import { Admin } from '../models/index.js';

const protectedRoute = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: 'Token required'
    });
  };
  try {
    const payload = jwt.decode(token, config.token.secret);
    const admin = await Admin.findById(payload.adminId);
    if (!admin) {
      return res.status(401).json('Usuario no existente');
    };
    req.admin = admin;
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Token invalid',
      data: error,
    });
  }
};

export default protectedRoute;
