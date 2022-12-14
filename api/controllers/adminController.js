import bcrypt from 'bcrypt';
import jwt from 'jwt-simple';
import { Admin } from '../models/index.js';
import config from '../config/index.js';

const adminRegister = async (req, res) => {
  try {
    const encryptedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = encryptedPassword;

    const newAdmin = await Admin.create(req.body);
    newAdmin.password = undefined;

    console.log('Nuevo Administrador registrado');

    res.json({
      message: 'Administrador registrado',
      data: newAdmin,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const adminLogin = async (req, res) => {
  const { password, email } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({
        message: 'Credenciales erróneas',
      });
    };

    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      return res.status(401).json({
        message: 'Credenciales erróneas',
      });
    };

    const payload = {
      adminID: admin._id,
      adminName: admin.name,
      adminLastName: admin.lastName,
      adminEmail: admin.email,
      adminPhone: admin.phone,
    };

    const token = jwt.encode(payload, config.token.secret);

    console.log('Login de Administrador exitoso');

    return res.json({
      message: 'Login correcto de Administrador',
      data: token,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error al iniciar sesión',
      data: error,
    });
  }
};

const getAllAdmins = async (_, res) => {
  try {
    const admins = await Admin.find({}, {password: 0});

    console.log('Administradores obtenidos');

    return res.json({
      message: 'Administradores obtenidos',
      data: admins,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error al obtener los administradores',
      data: error,
    });
  }
};

const getOneAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findById(id);
    admin.password = undefined;

    console.log('Administrador obtenido');

    return res.json({
      message: 'Administrador obtenido',
      data: admin,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error al obtener el administrador',
      data: error.message,
    });
  }
};

const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const adminUpdate = await Admin.findByIdAndUpdate(id, req.body);
    adminUpdate.password = undefined;

    console.log('Administrador actualizado');
    
    return res.json({
      message: 'Administrador actualizado',
      data: adminUpdate,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error al actualizar el administrador',
      data: error.message,
    });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const adminDelete = await Admin.findByIdAndDelete(id);
    adminDelete.password = undefined;

    console.log('Administrador eliminado');
    
    return res.json({
      message: 'Administrador eliminado',
      data: adminDelete,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error al eliminar el administrador',
      data: error,
    });
  }
};

export {
  adminRegister,
  adminLogin,
  getAllAdmins,
  getOneAdmin,
  updateAdmin,
  deleteAdmin,
};
