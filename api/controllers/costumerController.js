import bcrypt from 'bcrypt';
import jwt from 'jwt-simple';
import { Costumer } from '../models/index.js';
import config from '../config/index.js';

const registerCostumer = async (req, res) => {
  try {
    const encryptedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = encryptedPassword;

    const newCostumer = await Costumer.create(req.body);
    newCostumer.password = undefined;

    console.log('Nuevo cliente registrado');

    return res.json({
      message: 'Nuevo cliente registrado',
      data: newCostumer,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error al registrar el cliente',
      data: error,
    });
  }
};

const loginCostumer = async (req, res) => {
  const { password, email } = req.body;
  try {
    const costum = await Costumer.findOne({ email });
    if (!costum) {
      return res.status(401).json({
        message: 'Credenciales erróneas',
      });
    };

    const match = await bcrypt.compare(password, costum.password);
    if (!match) {
      return res.status(401).json({
        message: 'Credenciales erroneas',
      });
    };

    const payload = {
      costumId: costum._id,
      costumName: costum.name,
      costumLastName: costum.lastName,
      costumEmail: costum.email,
      costumPhone: costum.phone,
    };

    const token = jwt.encode(payload, config.token.secret);

    console.log('Login correcto del cliente');

    return res.json({
      message: 'Login correcto del cliente',
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error al iniciar sesión',
      data: error.message,
    });
  }
};

const getAllCostumer = async (_, res) => {
  try {
    const costumer = await Costumer.find({}, { password: 0 });

    console.log('Obtenidos todos los clientes');

    return res.json({
      message: 'Lista de clientes',
      data: costumer,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error al obtener los clientes',
      data: error,
    });
  }
};

const getOneCostumer = async (req, res) => {
  try {
    const { id } = req.params;
    const costumer = await Costumer.findById(id);
    costumer.password = undefined;

    console.log('Obtenido el cliente');

    return res.json({
      message: 'Cliente obtenido',
      data: costumer,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error al obtener el cliente',
      data: error,
    });
  }
};

const updateCostumer = async (req, res) => {
  try {
    const { id } = req.params;
    const costumerUpdate = await Costumer.findByIdAndUpdate(id, req.body);
    costumerUpdate.password = undefined;

    console.log('Cliente actualizado con exito');

    return res.json({
      message: 'Cliente actualizado',
      data: costumerUpdate,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error al actualizar el cliente',
      data: error,
    });
  }
};

const deleteCostumer = async (req, res) => {
  try {
    const { id } = req.params;
    const costumerDelete = await Costumer.findByIdAndDelete(id);
    costumerDelete.password = undefined;

    console.log('Cliente eliminado con exito');

    return res.json({
      message: 'Cliente eliminado',
      data: costumerDelete,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error al eliminar el cliente',
      data: error,
    });
  }
};

export {
  registerCostumer,
  loginCostumer,
  getAllCostumer,
  getOneCostumer,
  updateCostumer,
  deleteCostumer,
};